# @sizebay/headless
Sizebay Headless Package. The concept of Headless indicates that all the availability of the Virtual Fitting Room will be concentrated only in the methods and calls to Sizebay services, while the client/developer will be responsible for the layout.

# Installation
WIP

# Examples
WIP

# Bug Reporting
WIP

# Roadmap
You can check the details on what is being worked [here](https://github.com/sizebay/headless/issues)


# Recommended Module Order
1. `getProduct`: first, fetch the product data to check if the Virtual Fitting Room is compatible with that session.
2. `createUser`: creates the user based on the data provided in the UI. You don't need to fetch the user again, as this method's return already includes the updated signature.
3. `getRecommendation`: returns the recommendation based on the active user profile.
4. `updateUser`: if the user changes measurements, gender, or body shape data. You don't need to fetch the user again, as this method's return already includes the updated signature.

# Best Practices
1. Always use the assisted types from the library (e.g., import { type SizebayProduct } from '@sizebay/headless') to keep your object signatures consistent.
2. If custom hooks are created around these methods, remember to use useMemo and useCallback correctly to avoid memory drains and excessive computing.
3. Remember that the headless package offers no UI. The aim is to expand the integration of Sizebay with any platform interested in integrating our systems and recommendation algorithm.
4. If you plan to perform stress testing with the library or its resources, contact Sizebay beforehand and share the scheduling of this stress test so we can monitor the metrics on our side.
