$(function(){
    const boxes = [...$(".box")];
    const P1 = 'fa-circle-o',
    P2 = 'fa-times';
    let round = 1;

    const board = [
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

    function pick(event){
        const {row, column} = event.target.dataset;
        const turn = round % 2 === 0 ? P2 : P1;
        if(board[row][column] !== '') return;
        event.target.classList.add(turn);
        board[row][column] = turn;
        round++;

        console.log(checkEnd());
        if(checkEnd() !== undefined){
            $('#myModal').modal('show');
            $('#myModalTitle').text(checkEnd() + ' is a WINNER!');
            $('.box').attr('class', 'box fa');
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
})