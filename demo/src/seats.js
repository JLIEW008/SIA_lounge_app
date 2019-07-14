export class SeatingArrangement {
    constructor(image, seats, limit){
        this.image = image;
        this.seats = seats; // Includes minmax x and y to denote
        this.limit = limit; // Max number of iterations before denoting seat as taken
        this.element = document.getElementById("seats");
        this.occupancyStatus = []; // Track if seat is taken
        this.occupancyTracking = []; // Used to count interval before labelling/unlabelling seat as taken
        this.setup();
    }

    setup(){
        for(let i = 0; i < this.seats.length; ++i){
            this.occupancyStatus.push(false);
            this.occupancyTracking.push(0);
            let chairBlock = document.createElement("div");
            this.element.appendChild(chairBlock);
            chairBlock.id = "layer_" + i;
            chairBlock.style.position = "absolute";
            chairBlock.style.outline = "2px dashed blue";
            chairBlock.style.width = this.seats[i]["maxX"] - this.seats[i]["minX"] + "px";
            chairBlock.style.height = this.seats[i]["maxY"] - this.seats[i]["minY"] + "px";
            chairBlock.style.top  = this.seats[i]["minY"] + "px";
            chairBlock.style.left = this.seats[i]["minX"] + "px";
            console.log("Chair setup");
        }
        this.element.style.backgroundImage = this.image;
    }

    // Checks occupancy and alter maps immediately
    update(points){
        console.log(this.occupancyTracking[0]);
        for(let i = 0; i < this.seats.length; ++i){
            let onSeat = false;
            for(let j = 0; j < points.length; ++j){
                // If in range and seat not occupied, increment by 1
                if(this.inRange(points[j], i)){
                    onSeat = true;
                    if(!this.occupancyStatus[i]){
                        this.occupancyTracking[i]++;
                        break;
                    }
                }
            }
            // Seat labelled occupied but no one on seat
            if(!onSeat && this.occupancyStatus[i]){
                this.occupancyTracking[i]--;
            }

            if(!this.occupancyStatus[i] && this.occupancyTracking[i] >= this.limit){
                this.occupancyStatus[i] = true;
                this.updateMap(i, true);
            } else if(this.occupancyStatus[i] && this.occupancyTracking[i] < 0){
                this.occupancyStatus[i] = false;
                this.updateMap(i, false);
            }
        }
    }

    updateMap(idx, occupied){
        // Seat occupied
        let childElement = document.getElementById("layer_" + idx);
        if(occupied){

            childElement.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        } else {
            childElement.style.backgroundColor = "transparent";
        }
        console.log("Updated!");
    }

    inRange(point, idx){
        return point["x"] >= this.seats[idx]["minX"]
            && point["x"] <= this.seats[idx]["maxX"]
            && point["y"] >= this.seats[idx]["minY"]
            && point["y"] <= this.seats[idx]["maxY"];
    }
}
