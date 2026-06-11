/**
 * AI Service (Mocked for testing)
 */
class AIService {
    constructor() {
        this.context = "You are a professional AI receptionist for Cali Performance Detailing in Sacramento, CA. Friendly, professional, and automotive expert.";
    }

    /**
     * Generate a response based on user input and history.
     * @param {string} userInput 
     * @param {Array} history 
     */
    async generateResponse(userInput, history = []) {
        console.log('AI generating response for:', userInput);
        
        userInput = userInput.toLowerCase();

        if (userInput.includes('hello') || userInput.includes('hi')) {
            return "Hello! Thanks for calling Cali Performance Detailing. How can I help you today?";
        }

        if (userInput.includes('services') || userInput.includes('what do you do')) {
            return "We offer full detailing, paint correction, ceramic coating, and maintenance packages. Are you looking for something specific for your vehicle?";
        }

        if (userInput.includes('book') || userInput.includes('appointment') || userInput.includes('schedule')) {
            return "I can certainly help with that. What day were you thinking of coming in?";
        }

        if (userInput.includes('price') || userInput.includes('cost')) {
            return "Our packages start at 50 for basic detailing, but paint correction and ceramic coatings are quoted based on the vehicle's condition. Would you like me to book a consultation?";
        }

        return "That's interesting! Could you tell me more so I can better assist you with your detailing needs?";
    }

    /**
     * Extract booking details from conversation.
     * @param {string} text 
     */
    async extractBookingInfo(text) {
        // Mock extraction logic
        return {
            date: "2026-06-15",
            time: "10:00",
            service: "Full Detail"
        };
    }
}

module.exports = new AIService();
