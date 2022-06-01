export class UtilService {
    getCreatedAt() {
        const date = new Date()
        const yyyy = date.getFullYear()
        const mm = date.getMonth() + 1
        const dd = date.getDate()
        return `${yyyy}-${mm}-${dd}`
    }
    
    securePersonal(str) {
        return str.substring(0, 7) + "-*******"
    }
}

