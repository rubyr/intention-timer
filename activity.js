class Activity {
    constructor(category, description, seconds) {
        this.category = category;
        this.description = description;
        this.time = seconds;
        this.favorite = false;
        this.id = this.nextID();
    }

    nextID() {
        if (Activity.nextID === undefined) {
        Activity.nextID = 0;
        }
        return Activity.nextID++;
    }
}