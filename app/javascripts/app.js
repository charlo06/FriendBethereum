// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import FriendBet_artifacts from '../../build/contracts/FriendBet.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var FriendBet = contract(FriendBet_artifacts);
window.FriendBet = FriendBet;

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var endMatch;
var endTimeBet;
var team;
var valueBet;
var team1Name;
var team2Name;
var step;
if(step==1){
  App.displayJoinBet;
}

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    FriendBet.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
    });
    step=0;

  },

  createBet: function() {

    var CreateBetInstance;
    valueBet = document.getElementById('price').value;

    console.log('valueBet : ' +valueBet);



    var team1Name = document.getElementById('team1').value;
    var team2Name = document.getElementById('team2').value;
    var date = document.getElementById("finDuPari").value;
    var time = document.getElementById("finTime").value;
    var dateJs = new Date(date + " " + time);
    console.log('date end time bet : ' + dateJs);
    endTimeBet= Math.floor(new Date(dateJs).getTime() / 1000);
    console.log('date end time bet : ' + endTimeBet);

    var date2 = document.getElementById("resultatDuPari").value;
    var time2 = document.getElementById("resultTime").value;
    var dateJs2 = new Date(date2 + " " + time2);
    console.log('date end time bet : ' + dateJs2);
    endMatch= Math.floor(new Date(dateJs2).getTime() / 1000);
    console.log('date end time bet : ' + endMatch);
    FriendBet.deployed().then(function(instance){
      CreateBetInstance = instance;

      return CreateBetInstance.createBet(valueBet,endMatch,endTimeBet, {from: account});
    }).then(function(result){
      return console.log("esseye test 1 2");
      step=1;
    }).catch(function(err){
      console.log(err.message);
    });
  //});
  },

  CheckNumberBet: function(team){


    console.log("check si le joueur à deja fait un paris")    // TO DO
    FriendBet.deployed().then(function(instance){
      CreateBetInstance = instance;
      return FriendBet.numberOfBetForTeam[team].call(function(err,res){
        if(res != 0){
          console.log("paris déja effectué pour l'équipe " + res);
        }
        else{
          console/log("aucun paris pour la team " +team);
        }
      });
    }).catch(function(err){
      console.log(err.message);
    });
  },

  MakeBet: function() { //function to make the bet on the smart contract

    console.log("debut du paris");
    var CreateBetInstance;
    var radios = document.getElementsByName('teamWinner');
    for (var i = 0, length = radios.length; i < length; i++)
    {
     if (radios[i].checked)
     {
      // do whatever you want with the checked radio
      team=i+1;

      // only one radio can be logically checked, don't check the rest
      break;
     }
    }

    console.log("paris pour la team " + team);
    FriendBet.deployed().then(function(instance){
      CreateBetInstance = instance;

      return CreateBetInstance.betTeam(team, {from: account});
    }).then(function(result){
      return console.log("paris réussie");
    }).catch(function(err){
      console.log(err.message);
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },
  displayCreateBet: function(){
    document.getElementById("createBet").style.display = "block";
    document.getElementById("joinBet").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("oracle").style.display = "none";

  },
  displayJoinBet: function(){
    document.getElementById("createBet").style.display = "none";
    document.getElementById("joinBet").style.display = "block";
    document.getElementById("results").style.display = "none";
    document.getElementById("oracle").style.display = "none";
  },
  displayResults: function(){
    document.getElementById("createBet").style.display = "none";
    document.getElementById("joinBet").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("oracle").style.display = "none";

  },
  displayOracle: function(){
    document.getElementById("createBet").style.display = "none";
    document.getElementById("joinBet").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("oracle").style.display = "block";

  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
