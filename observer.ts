
interface Subject {
    state: boolean;
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

class Heist implements Subject {
    public state: boolean;
    private observers: Observer[] = []
    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Heist : Observer has been attached already.')
        }
        console.log('Heist: Thief added .')
        this.observers.push(observer)
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.')
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.')
    }

    /**
     * Запуск обновления в каждом подписчике.
     */
    public notify(): void {
        console.log('Heist: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this)
        }
    }


    public begin(status:boolean): void {
        this.state = status
        this.notify()
    }

}


/**
 * Конкретные Наблюдатели реагируют на обновления, выпущенные Издателем, к
 * которому они прикреплены.
 */
class Cracker implements Observer {
    public update(subject: Subject): void {
        if (subject.state) {
            console.log('Cracker: go to  heist')
        }
        else console.log('Cracker: caught')
    }
}

class Porter implements Observer {
    public update(subject: Subject): void {
        if (subject.state) {
            console.log('Porter: go to  heist')
        }
        else console.log('Porter: caught')
    }
}
class Cop extends Porter {
    public catch (leader:Ringleader){
        console.log("Police! You are under arrest ")
        leader.catch()
    }
}
class Driver implements Observer {
    public update(subject: Subject): void {
        if (subject.state){
            console.log('Driver: go to  heist')
        }
        else console.log('Driver: caught')
    }
}

class Ringleader {
    public arrest :boolean
    private heist : Heist
    private readonly cracker : Cracker
    private readonly driver : Driver
    private readonly porter  : Porter
    constructor(answer : boolean) {
        this.arrest = false
        this.heist = new Heist()
        this.cracker = new Cracker()
        this.driver = new Driver()
        if (answer){
            this.porter = new Cop()
        }
        else {
            this.porter = new Porter()
        }
    }
    public makeBand(){
        this.heist.attach(this.cracker)
        this.heist.attach(this.driver)
        this.heist.attach(this.porter)
    }
    public beginHeist (){
        if (this.porter instanceof Cop){
            this.porter.catch(this)
        }

        this.heist.begin(!this.arrest)
    }

    public catch() {
        this.arrest = true
    }
}

/**
 *  client logic
 */
function clients(cop : boolean){
    let ringleader = new Ringleader(cop)
    ringleader.makeBand()
    ringleader.beginHeist()
}
clients(true)