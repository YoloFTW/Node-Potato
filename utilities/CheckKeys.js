


module.exports = {

    /**
     * checks to options for all requird keys
     * @param {Object} obj
     * @param {Array} requiredKeys
     * @returns {Boolean} true
     */
    checkKeys: (obj, requiredKeys) => {

        const missingKeys = requiredKeys.filter((key) => !obj.hasOwnProperty(key));

        if (missingKeys.length > 0) {
            throw new Error(`Missing required options: ${missingKeys.join(", ")}`);
        }

    }

}