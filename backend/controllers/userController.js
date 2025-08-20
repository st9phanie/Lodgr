// GET api/user

export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.recentSearchedCities
        res.json({ success: true, role, recentSearchedCities })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body
        const user = req.user;
        user.recentSearchedCities = user.recentSearchedCities.filter(
            (city) => city !== recentSearchedCity
        );
        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity)
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity)
        }
        await user.save()
        res.status(200).json({ success: true, message: "City added" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }
}