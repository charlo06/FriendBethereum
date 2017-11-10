pragma solidity ^0.4.2;

contract FriendBet{
    address _creator;
    uint public _valueBet;
    uint _endTimeBet;
    uint _endMatch;
    uint _balance;
    uint _team1Bet;
    uint _team2Bet;
    uint _team3Bet;
    uint _winner;
    uint _prizeBet;

    mapping(address=>uint) public playerChoice;
    mapping(uint => uint) public numberOfBetForTeam;

    event Finished (uint winner);


    //--------------------modifier-----------------------------
    modifier isOwner() {
        if(msg.sender != _creator) return;
        _;
    }

    modifier notPlayedYet(){
      if(playerChoice[msg.sender] != 0) return;
      _;
    }

    modifier canStillBet() {
      if (now >= _endTimeBet) return;
      _;
    }

    modifier endOfMatch(){
      if(now < _endMatch) return;
      _;
    }


/*<<<<<<< HEAD*/
    /*function createBet(uint valueBet, uint endMatch, uint endTimeBet, uint team) public {*/
/*=======*/
    function FriendBet(uint valueBet, uint endMatch, uint endTimeBet, uint team) public {
/*>>>>>>> eb49909ad4d8ee16811d2071ed5ab88fda88f3d3*/
        _valueBet = valueBet;
        _endTimeBet = endTimeBet;
        _endMatch = endMatch;
        _creator = msg.sender;
        _balance = 0;
        numberOfBetForTeam[3] = 0; //if bet on draw
        numberOfBetForTeam[1] = 0;
        numberOfBetForTeam[2] = 0;
        _winner = 0;
        _prizeBet = 0;

        betTeam(team);
    }

    function betTeam(uint team) notPlayedYet() {
        playerChoice[msg.sender] = team;
        _balance += _valueBet;
        numberOfBetForTeam[team] += 1;
    }
    function getNumberOFBetForTeam(uint team) public constant returns(uint){
      return(numberOfBetForTeam[team]);
    }

    function getwinnerBet(uint winner) isOwner(){
      _winner = winner;
      _prizeBet = _valueBet*(numberOfBetForTeam[3]+ numberOfBetForTeam[1]+ numberOfBetForTeam [2])/ numberOfBetForTeam[winner];
    }
    function getmoneybet(){
      playerChoice[msg.sender] = 3; //avoid withdraw more than once
      msg.sender.transfer(_prizeBet);
    }


}
