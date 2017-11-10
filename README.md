# FriendsBethereum
This project is a Décentralize Application  for making bets with friends.

## Install Intructions

Prerequisites : Have `npm` installed on your computer. For more information, please visit [npm](https://www.npmjs.com/)

1. Clone this project from GitHub
2. Open the repository in terminal then run `npm install`

## Building and the frontend

1. First run the command `testrpc` in your terminal.
2. In your repository,  run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
3. Then run `npm run dev` to build the app and serve it on http://localhost:8080

##Intructions

when we watch a game with some friends, who never tell "i can bett X€ than my team will win" but when it's come to put money on the table, we didn't have all the time some cash with us.
this is the raison why we dessided to make a Décentrelize Application who can help people in this situation, by simply tell the match, the ammout of money we want everyone as to bet, and a easy way to withdrax the monney when the game it's over. the app include a time before closing the bet, to avoid people who will bet just before the end of the game, when the winner is now by all.

##contract
it's a simple and effective contract, to created a bet, bet on a team, select the winner, and withdraw our monney if we win the bet.

function FriendBet() public :

    the contract constructor, initialize all the variable to 0.

function createBet( uint valueBet, uint endMatch, uint endTimeBet) BetIsCreated() :

    first fonction to be call. creat the data of the bet. once is create, this function can't be call agains.

function betTeam(uint team) notPlayedYet()  canStillBet

    function to bet on a team. store the choise of the player in a mapping on upgrade the number of bet on this team. only 1 bet by address during the time of the beat.

function getwinnerBet(uint winner) isOwner()  endOfMatch()

    function to select the winner of the game. fixe the winner team and the prize for all the player who choose the right team. can be execute only by the owner when the match is over.

function getmoneybet()  endOfMatch() iswinner(){

  function to withdraw the monney. after the end of the match and if you win, change the value of your choise to avoid multiple withdraw and send you the monney.

##What Next ?

for now, the contracts is unique, it's mean only one bet at the team is avalible. the next step is when we created a bet, a new contract is generated to take care of this bet. so when can access to a specific bet contract with is address.
alose the prize bet is calculated with the sum of all the bet, and not with the actual contract balance. so it's can sometime append that no enought monney are in the contract, so the player can't withdraw is monney.

##contract Security
 the most security issue in this contract is to choose the winner. indeed, for now, is the bet creator who say who is the winner team and nothing can stop him to lay about the final outcome.
 to avoid it, we could use a service such has oraclize. when it's call, il will come from a API the information we need. by doing this, the bet creator couldn't lye and the outcome and still money from the other player.
 


## Contributors

Julien Aflalo
Charlélie Obadia
Aurelien Barthe-Lapeyrigne
