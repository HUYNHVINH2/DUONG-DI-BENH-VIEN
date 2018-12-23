const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title       : String,
    description : String,
});
const LocationModel = mongoose.model('location', locationSchema);

class Location extends LocationModel {
    static insert(title, description) {
        // VIET PROMISE
        return new Promise(async resolve => {
            try {
                let initLocation = new Location({ title, description });
                let saveLocation = await initLocation.save();
                if (!saveLocation) return resolve({ error: true, message: 'cannot_save_location' });
                return resolve({ error: false, data: saveLocation });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
}

module.exports = Location;
