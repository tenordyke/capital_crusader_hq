// Service to handle webhook calls to the backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const sendLeadToWebhook = async (leadData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/webhook/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new Error(`Webhook call failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Webhook response:', result);
    return result;
  } catch (error) {
    console.error('Error calling webhook:', error);
    throw error;
  }
};
