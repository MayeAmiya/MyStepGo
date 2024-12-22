class textdata {
  index: number = -1;
  infomationType: string = "text";
  context: string;
  constructor(context: string) {
    this.context = context;
  }
  async uploadText(): Promise<boolean> {
    const data = {
      index: this.index,
      infomationType: this.infomationType,
      context: this.context,
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
        return false;
      });
    return false;
  }
}

export { textdata }