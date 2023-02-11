$(function(){
    const boxes = [...$(".box")];
    const P1 = 'fa-circle-o',
    P2 = 'fa-times';
    let round = 1;

    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const combinations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    boxes.forEach(element => {
        element.addEventListener('click', pick);
    });

    //$('#myModal').modal('show');
    $('.modal-body').html(" <input type='email' id='defaultForm-email'</input> </br> <input type='email' id='defaultForm-email'</input> </br>");
    function pick(event){
        const {row, column} = event.target.dataset;
        const turn = round % 2 === 0 ? P2 : P1;
        if(board[row][column] !== '') {
            shakeElement(event.target);
            return;
        }
        if (turn == P1) $('.currentPlayerInfo').text('PLAYER 2 TURN');
        if (turn == P2) $('.currentPlayerInfo').text('PLAYER 1 TURN');
        event.target.classList.add(turn);
        board[row][column] = turn;
        round++;

        if(checkEnd() !== undefined){
            $('#myModal').modal('show');
            $('#myModalTitle').text(checkEnd() + ' is a WINNER!');
            $('.modal-body').html("<p> Click 'Ok' to reset board </p>");
            $('.box').attr('class', 'box fa');
            $('.currentPlayerInfo').text('PLAYER 1 TURN');
            board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];

            round = 1;
            return;
        } 

        if(round === 10){
            $('#myModal').modal('show');
            $('#myModalTitle').text('DRAW!');
            $('.modal-body').html("<p> Click 'Ok' to reset board </p>");
            $('.box').attr('class', 'box fa');
            $('.currentPlayerInfo').text('PLAYER 1 TURN');
            board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];

            round = 1;
            return;
        }
    }

    function checkEnd(){
        const result = board.reduce((total, row) => total.concat(row));
        let winner;
        let moves = {
            'fa-times': [],
            'fa-circle-o': []
        };
        
        result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
        combinations.forEach(combination => {
            if(combination.every(index => moves[P1].indexOf(index) > -1)){
                winner = 'Player 1';
            }else if (combination.every(index => moves[P2].indexOf(index) > -1))
            {
                winner = 'Player 2';
            }
        })

        return winner;
    }

    function shakeElement(element){
        $(element).addClass('shake');
        setTimeout(function(){
            $(element).removeClass('shake');
        },1000);
    };
})