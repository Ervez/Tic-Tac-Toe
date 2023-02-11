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
        const turn = round % 2 === 0 ? P2 : P1;
        event.target.classList.add(turn);
        round++;
    }
})