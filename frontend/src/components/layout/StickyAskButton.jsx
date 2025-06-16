import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const StickyAskButton = () => {
  useEffect(() => {
    // Load the ElevenLabs ConvAI script
    if (!document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }

    // Add the ConvAI widget element if it doesn't exist
    if (!document.querySelector('elevenlabs-convai')) {
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_01jxrzhz1jf7ttr1ym87v6hdjz');
      document.body.appendChild(widget);
    }

    // Add custom styling for the ConvAI widget to match Capital Crusader branding
    const addCustomStyling = () => {
      if (!document.querySelector('#convai-custom-styles')) {
        const style = document.createElement('style');
        style.id = 'convai-custom-styles';
        style.textContent = `
          /* Capital Crusader ConvAI Widget Styling */
          elevenlabs-convai {
            --convai-primary-color: #dc2626 !important; /* Red */
            --convai-secondary-color: #f59e0b !important; /* Yellow */
            --convai-accent-color: #fb923c !important; /* Orange */
            --convai-background-color: #1f2937 !important; /* Dark blue-gray */
            --convai-text-color: #ffffff !important; /* White text */
            --convai-border-radius: 16px !important; /* Rounded corners */
            --convai-font-family: 'Comic Sans MS', cursive !important; /* Comic font */
          }

          /* Widget container styling */
          elevenlabs-convai .convai-widget {
            background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%) !important;
            border: 2px solid #f59e0b !important;
            border-radius: 20px !important;
            box-shadow: 0 25px 50px -12px rgba(220, 38, 38, 0.25) !important;
            font-family: 'Comic Sans MS', cursive !important;
          }

          /* Header styling */
          elevenlabs-convai .convai-header {
            background: linear-gradient(90deg, #dc2626, #f59e0b, #fb923c) !important;
            color: white !important;
            font-family: 'Comic Sans MS', cursive !important;
            font-weight: bold !important;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;
            border-radius: 18px 18px 0 0 !important;
            padding: 16px !important;
          }

          /* Chat messages styling */
          elevenlabs-convai .convai-message {
            font-family: 'Comic Sans MS', cursive !important;
            border-radius: 12px !important;
          }

          /* User messages */
          elevenlabs-convai .convai-message.user {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            color: white !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5) !important;
          }

          /* AI messages */
          elevenlabs-convai .convai-message.assistant {
            background: linear-gradient(135deg, #374151, #4b5563) !important;
            color: #fbbf24 !important;
            border: 1px solid #f59e0b !important;
          }

          /* Input field styling */
          elevenlabs-convai .convai-input {
            background: #374151 !important;
            border: 2px solid #f59e0b !important;
            border-radius: 12px !important;
            color: white !important;
            font-family: 'Comic Sans MS', cursive !important;
            padding: 12px !important;
          }

          elevenlabs-convai .convai-input:focus {
            border-color: #dc2626 !important;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
          }

          /* Send button styling */
          elevenlabs-convai .convai-send-button {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            border: none !important;
            border-radius: 12px !important;
            color: white !important;
            font-family: 'Comic Sans MS', cursive !important;
            font-weight: bold !important;
            padding: 12px 16px !important;
            transition: all 0.3s ease !important;
          }

          elevenlabs-convai .convai-send-button:hover {
            background: linear-gradient(135deg, #b91c1c, #991b1b) !important;
            transform: scale(1.05) !important;
          }

          /* Close button styling */
          elevenlabs-convai .convai-close-button {
            background: #f59e0b !important;
            border: none !important;
            border-radius: 50% !important;
            color: #1f2937 !important;
            font-weight: bold !important;
          }

          /* Scrollbar styling */
          elevenlabs-convai .convai-messages::-webkit-scrollbar {
            width: 8px !important;
          }

          elevenlabs-convai .convai-messages::-webkit-scrollbar-track {
            background: #374151 !important;
            border-radius: 4px !important;
          }

          elevenlabs-convai .convai-messages::-webkit-scrollbar-thumb {
            background: #f59e0b !important;
            border-radius: 4px !important;
          }

          elevenlabs-convai .convai-messages::-webkit-scrollbar-thumb:hover {
            background: #dc2626 !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Apply styling after a short delay to ensure widget is loaded
    setTimeout(addCustomStyling, 1000);
    
    // Also apply styling when widget becomes visible
    const observer = new MutationObserver(() => {
      if (document.querySelector('elevenlabs-convai')) {
        addCustomStyling();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const handleAskTroy = () => {
    // Trigger the ElevenLabs ConvAI widget
    const convaiWidget = document.querySelector('elevenlabs-convai');
    if (convaiWidget) {
      // Trigger the widget to open
      convaiWidget.click();
    }
  };

  return (
    <button
      onClick={handleAskTroy}
      className="sticky-ask-button fixed bottom-20 sm:bottom-24 right-3 sm:right-4 z-40 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white font-comic font-bold py-3 px-5 sm:py-3.5 sm:px-6 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 group"
      aria-label="Ask Troy a question via AI chat"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-[10deg] group-hover:scale-110" />
      Ask Troy
    </button>
  );
};

export default StickyAskButton;
