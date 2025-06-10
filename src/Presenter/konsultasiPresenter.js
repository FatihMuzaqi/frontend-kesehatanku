
export default class KonsultasiPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async submitKonsultasi(url_image, image, userId) {
        if (!image) return;

        this.#view.setIsLoading(true);
        this.#view.setIsUploading(true);
        try {
            // Add user message to chat
            const userMessage = {
                id: Date.now(),
                type: 'user',
                content: 'image',
                image: url_image,
                timestamp: new Date().toLocaleTimeString()
            };

            this.#view.setChatHistory(prev => [...prev, userMessage]);

            // Prepare FormData for API
            const formData = new FormData();
            formData.append('file', image);
            formData.append('userId', userId);

            // TODO: Replace with your actual API endpoint
            const res = await this.#model.createPredict(formData);


            // Add AI response to chat
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: `${res.deskripsi} \n  ${res.saran}` || 'Hasil prediksi akan muncul di sini',
                confidence: res.kepercayaan_diri,
                recommendations:  ['Konsultasi dengan dokter spesialis', 'Jaga pola hidup sehat'],
                timestamp: new Date().toLocaleTimeString()
            };

            this.#view.setChatHistory(prev => [...prev, aiMessage]);

            // Reset form
            this.#view.setSelectedImage(null);

        } catch (error) {
            console.error('Error:', error);
            // Add error message to chat
            const errorMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: 'Maaf, terjadi kesalahan saat memproses foto. Silakan coba lagi.',
                error: true,
                timestamp: new Date().toLocaleTimeString()
            };
            this.#view.setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            this.#view.setIsLoading(false);
            this.#view.setIsUploading(false);
        }
    }
    async getUser() {
        this.#view.setIsLoading(true);
        try {
            const res = await this.#model.getUser();
            this.#view.setShowConsultationModal(true);
            this.#view.setUser(res.user);
        } catch {
            this.#view.navigate("/login");
        } finally {
            this.#view.setIsLoading(false);
        }
    }
}