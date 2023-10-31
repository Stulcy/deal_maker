# Stulcy's DealMaker 🤝

Very simplistic web3 deal maker on Mumbai Polygon. Allows 2 users to trade tokens over the counter without an intermediary, everything runs through smart contracts.

*Why would you even need that?*

Let's say you want to swap 20 WETH for 1 WBTC on Polygon for example. One user needs to send their funds over first and there is no security that the other user will send promised funds back. Yikes! That's why you might want to initiate a deal on Stulcy's DealMaker. It deploys a contract with predefined tokens and rates of the swap. When both users approve their Deal contract to spend their tokens, any of the users can execute the trade which will exchange their tokens on its own. Simple as that!

## Testing out the project
- clone this github repo
- ```npm i```
- ```npm run start```
<br />
