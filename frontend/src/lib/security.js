// Security utilities to protect against unauthorized code changes
export class WebsiteProtection {
  constructor() {
    this.originalConsole = { ...console };
    this.protectedElements = new Set();
    this.init();
  }

  init() {
    this.protectConsole();
    this.protectDevTools();
    this.protectSourceCode();
    this.monitorDOMChanges();
  }

  // Protect console from unauthorized access
  protectConsole() {
    const allowedOrigins = ['localhost', '127.0.0.1', 'capital-crusader'];
    
    Object.keys(console).forEach(method => {
      const original = console[method];
      console[method] = (...args) => {
        if (this.isAuthorizedAccess()) {
          original.apply(console, args);
        }
      };
    });
  }

  // Detect and discourage dev tools usage
  protectDevTools() {
    let devtools = { open: false, orientation: null };
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 || 
          window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          this.handleDevToolsDetection();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showSecurityWarning('Right-click disabled for security');
    });

    // Disable common dev shortcuts
    document.addEventListener('keydown', (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        this.showSecurityWarning('Developer tools access restricted');
      }
    });
  }

  // Protect source code visibility
  protectSourceCode() {
    // Disable text selection on sensitive elements
    document.addEventListener('selectstart', (e) => {
      if (this.protectedElements.has(e.target.closest('[data-protected]'))) {
        e.preventDefault();
      }
    });

    // Disable drag operations
    document.addEventListener('dragstart', (e) => {
      if (this.protectedElements.has(e.target.closest('[data-protected]'))) {
        e.preventDefault();
      }
    });
  }

  // Monitor for unauthorized DOM changes
  monitorDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          this.validateDOMIntegrity(mutation);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'data-protected']
    });
  }

  // Check if access is from authorized source
  isAuthorizedAccess() {
    const userAgent = navigator.userAgent.toLowerCase();
    const referrer = document.referrer.toLowerCase();
    
    // Allow access from development environment
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
      return true;
    }

    // Block suspicious user agents
    const suspiciousAgents = ['bot', 'crawler', 'spider', 'scraper'];
    return !suspiciousAgents.some(agent => userAgent.includes(agent));
  }

  // Handle dev tools detection
  handleDevToolsDetection() {
    this.showSecurityWarning('Developer tools detected - Access monitored');
    
    // Log security event
    this.logSecurityEvent('DEV_TOOLS_DETECTED', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }

  // Validate DOM integrity
  validateDOMIntegrity(mutation) {
    const target = mutation.target;
    
    // Check for unauthorized script injections
    if (target.tagName === 'SCRIPT' && !target.hasAttribute('data-authorized')) {
      this.handleSecurityViolation('UNAUTHORIZED_SCRIPT', target);
    }

    // Check for suspicious style modifications
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      const element = mutation.target;
      if (element.style.display === 'none' && element.hasAttribute('data-protected')) {
        this.handleSecurityViolation('PROTECTED_ELEMENT_HIDDEN', element);
      }
    }
  }

  // Handle security violations
  handleSecurityViolation(type, element) {
    console.warn(`Security violation detected: ${type}`);
    
    // Restore element if it was tampered with
    if (element && element.hasAttribute('data-protected')) {
      element.style.display = '';
      element.style.visibility = 'visible';
    }

    this.logSecurityEvent('SECURITY_VIOLATION', {
      type,
      timestamp: new Date().toISOString(),
      element: element ? element.tagName : 'unknown'
    });
  }

  // Show security warning to user
  showSecurityWarning(message) {
    // Create a non-intrusive warning
    const warning = document.createElement('div');
    warning.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #ff4444;
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 10000;
      font-size: 12px;
      max-width: 300px;
    `;
    warning.textContent = message;
    document.body.appendChild(warning);

    setTimeout(() => {
      if (warning.parentNode) {
        warning.parentNode.removeChild(warning);
      }
    }, 3000);
  }

  // Log security events
  logSecurityEvent(type, data) {
    // In production, this would send to your security monitoring service
    if (process.env.NODE_ENV === 'development') {
      console.log(`Security Event: ${type}`, data);
    }
  }

  // Mark elements as protected
  protectElement(element) {
    if (element) {
      element.setAttribute('data-protected', 'true');
      this.protectedElements.add(element);
    }
  }

  // Remove protection from element
  unprotectElement(element) {
    if (element) {
      element.removeAttribute('data-protected');
      this.protectedElements.delete(element);
    }
  }
}

// Initialize protection when module loads
export const websiteProtection = new WebsiteProtection();

// Export utility functions
export const protectElement = (element) => websiteProtection.protectElement(element);
export const unprotectElement = (element) => websiteProtection.unprotectElement(element);
