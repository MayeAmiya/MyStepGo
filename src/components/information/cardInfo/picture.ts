class picture {
    index: number = -1;
    infomationType: string = "image";
    imageUrl: string;
    description: string;

    constructor(imageUrl: string, description: string) {
        this.imageUrl = imageUrl;
        this.description = description;
    }

    async uploadPicture(): Promise<boolean> {
        const data = {
            index: this.index,
            imageUrl: this.imageUrl,
            description: this.description,
        };

        fetch('https://your-server-endpoint.com/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                this.index = result.index;
                console.log('Success:', result);
                return true;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return false;
    }
}

export { picture }