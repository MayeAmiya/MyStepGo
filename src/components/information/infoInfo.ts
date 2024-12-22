import axios from 'axios';

class InfoInfo {
    id: number;
    type: string;
    infoString: string;
    infos: number[];

    constructor(id: number, type: string, infoString: string, infos: number[]) {
        this.id = id;
        this.type = type;
        this.infoString = infoString;
        this.infos = infos;
    }
}

class InfoInfos {
    infoInfoList: InfoInfo[];

    constructor() {
        this.infoInfoList = [];
        this.initializeInfoInfoList();
    }

    followInfo(id: number, info: number): void {
        this.infoInfoList.forEach((infoInfo) => {
            if (infoInfo.id === id) {
                infoInfo.infos.push(info);
            }
        });
    }
    clearInfo(id: number): void {
        this.infoInfoList.forEach((infoInfo) => {
            if (infoInfo.id === id) {
                infoInfo.infos = [];
            }
        });
    }

    async createInfoInfo(type: string, infoString: string): Promise<void> {
        // try {
        //     const response = await axios.post('https://example.com/api/infoInfo', {
        //         id: -1,
        //         type,
        //         infoString
        //     });
        //     const data = response.data;
        //     const newInfoInfo = new InfoInfo(data.id, data.type, data.infoString);
        //     this.infoInfoList.push(newInfoInfo);
        // } catch (error) {
        //     console.error(error);
        // }
        this.infoInfoList.push(new InfoInfo(this.infoInfoList.length + 1, type, infoString, []));
    }

    async find(type: string): Promise<InfoInfo> {
        const infoInfoTemp = new InfoInfo(0, '', '', []);
        // try {
        //     const response = await axios.get(`https://example.com/api/infoInfo?type=${type}`);
        //     const data = response.data;
        //     const infoInfoTemp = data.map((infoInfo: any) => new InfoInfo(infoInfo.id, infoInfo.type, infoInfo.infoString));
        //     this.infoInfoList.push(infoInfoTemp);
        // } catch (error) {
        //     console.error(error);
        // }
        this.infoInfoList.forEach((infoInfo) => {
            if (infoInfo.type === type) {
                infoInfoTemp.id = infoInfo.id;
                infoInfoTemp.type = infoInfo.type;
                infoInfoTemp.infoString = infoInfo.infoString;
                infoInfoTemp.infos = infoInfo.infos;
            }
        });
        return infoInfoTemp;
    }

    async initializeInfoInfoList(): Promise<void> {
        // try {
        //     const response = await axios.get('https://example.com/api/infoInfo');
        //     const data = response.data;
        //     this.infoInfoList = data.map((infoInfo: any) => new InfoInfo(infoInfo.id, infoInfo.type, infoInfo.infoString));
        // } catch (error) {
        //     console.error(error);
        // }
    }
}

export { InfoInfo, InfoInfos };