interface Subject {
    state: boolean;
    parcels : Parcels[]
    // Присоединяет наблюдателя
    attach(observer: Observer): void;
    // Отсоединяет наблюдателя
    detach(observer: Observer): void;
    // Уведомляет всех наблюдателей о событии.
    notify(): void;
}
interface Observer {
    // Получить обновление от субъекта.
    update(subject: Subject): void
}
interface Parcels {
    type: "newspapers" | "journal"
    destination : string
}
class User_1 implements Observer{
    update(subject: Subject) {
        if (subject.state){
            subject.parcels.map((e) => {
                if (e.destination === "user_1"){
                    console.log("oh, did you get the package ")
                }
            })
        }
    }
}
class User_2 implements Observer{
    update(subject: Subject): void {
        if (subject.state){
            subject.parcels.map((e) => {
                if (e.destination === "user_2"){
                    console.log("oh, did you get the package ")
                }
            })
        }
    }
}

class PostalOffice implements Subject{
    // if there are new messages then true, or not - false
    state: boolean;
    observers: Observer[] = []
    parcels: Parcels[] = []
    attach(observer: Observer): void {
        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }
        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    getParcels(parcel : Parcels){
        this.parcels.push(parcel)
        this.state = true
        this.notify()
    }

}
function client(){
    let postalOffice = new PostalOffice()
    let user_1 = new User_1()
    postalOffice.attach(new User_1())
    postalOffice.attach(new User_2())
    postalOffice.getParcels({
        type: "newspapers",
        destination : "user_1"
    })
}
client()