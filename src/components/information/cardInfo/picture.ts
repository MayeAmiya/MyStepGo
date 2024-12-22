class picture {
    index: number = -1;
    infomationType: string = "image";
    imageUrl: string;

    constructor(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    async uploadPicture(): Promise<boolean> {
        const data = {
            index: this.index,
            imageUrl: this.imageUrl,
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