const slots = ['first', 'second', 'third'];

            const users = [
                { id: 1, name: 'moe', slot: 'first'},
                { id: 2, name: 'larry', slot: 'second'},
                { id: 3, name: 'curly', slot: 'third'},
                { id: 4, name: 'lucy', slot: 'third', selected: true },
            ];

            const selectedLis = [];

            function clickButton(ev) {
                //debugger;
                //console.dir(ev);
                const userLi = ev.target;
                const divContainerClick = ev.target.parentNode.parentNode.parentNode;
                var wrongArrow = false;
                var emptySibling = false;
                if(ev.target.id === 'left') {
                    //console.dir(divContainerClick);
                    clickSelect(ev);
                    const divSibling = ev.target.parentNode.parentNode.parentNode.previousElementSibling;
                    //console.dir(divSibling);
                   
                        selectedLis.forEach(userLI => {
                            const name = userLI.innerHTML;
                            users.forEach(user => {
                                if(divContainerClick === userLI.parentNode.parentNode.parentNode)
                                {
                                    if(divSibling != null)
                                    {
                                        if(user.name === name)
                                        {
                                            userLI.innerHTML = '';
                                            if(divSibling.id === 'first')
                                                user.slot = 'first';
                                            else if(divSibling.id === 'second')
                                                user.slot = 'second';
                                            
                                            setUp();
                                        }
                                    }
                                    else
                                    emptySibling = true;
                                }
                                else
                                    wrongArrow = true;

                                //resetSelections();
                            });
                        });
                        //console.log(selectedLis);
      
                    if(emptySibling === true)
                    {
                        alert('Cannot move in that direction');
                        emptySibling = false;
                    }

                    if(wrongArrow === true)
                    {
                        alert('Click the arrow corresponding to the correct list');
                        wrongArrow = false;
                    }
                    resetSelections();
                }
                else if(ev.target.id === 'right') {
                    //console.dir(divContainerClick);
                    clickSelect(ev);
                    const divSibling = ev.target.parentNode.parentNode.parentNode.nextElementSibling;
                   
                    selectedLis.forEach(userLI => {
                        const name = userLI.innerHTML;
                        users.forEach(user => {
                            if(divContainerClick === userLI.parentNode.parentNode.parentNode)
                            {
                                if(divSibling != null)
                                {
                                    if(user.name === name)
                                    {
                                        userLI.innerHTML = '';
                                        if(divSibling.id === 'second')
                                            user.slot = 'second';
                                        else if(divSibling.id === 'third')
                                            user.slot = 'third';
                                        
                                        setUp();
                                    }
                                }
                                else
                                    emptySibling = true;
                            }
                            else
                                wrongArrow = true;

                            //resetSelections();
                        });
                    });
                    
                    if(wrongArrow === true)
                    {
                        alert('Click the arrow corresponding to the correct list');
                        wrongArrow = false;
                    }
                    if(emptySibling === true)
                    {
                        alert('Cannot move in that direction');
                        emptySibling = false;
                    }
                    resetSelections();
                }
                //resetSelections();
            }

            function clickSelect(ev) {
                //select lis and color
                if(ev.target.className === '' || ev.target.className === 'grey' )
                {
                    if(ev.target.innerHTML != '' && ev.target.nodeName === 'LI')
                        ev.target.className = 'red';

                    if(ev.target.id != 'left' && ev.target.id != 'right')
                    {
                        if(ev.target.innerHTML != '' && ev.target.nodeName != 'OL')
                        {
                            selectedLis.push(ev.target);
                            console.dir(selectedLis)
                        }
                            //selectedLis.push(ev.target);
                    }
                }
                else //revert and deselect
                {
                    if(ev.target.id === 'left' || ev.target.id === 'right')
                    {
                        ev.target.className = 'grey';
                    }
                    else
                        ev.target.className = '';
                    for( let i = 0; i < selectedLis.length; i++){ 
                    
                        if ( selectedLis[i] === ev.target) { 
                    
                            selectedLis.splice(i, 1); 
                        }
                    }
                }
            }

            function setUp()
            {
                users.forEach(user => {
                    const userLi = document.createElement('li');
                    userLi.innerHTML = user.name;

                    if(user.slot === 'first')
                    {
                        userOllist[0].children[user.id - 1].innerHTML = userLi.innerHTML;
                    }
                    else if(user.slot === 'second')
                    {
                        userOllist[1].children[user.id - 1].innerHTML = userLi.innerHTML;
                    }
                    else if(user.slot === 'third')
                    {
                        userOllist[2].children[user.id - 1].innerHTML = userLi.innerHTML;
                    }
                });
            }

            function resetSelections() {
                //deselect all
                var lis = document.getElementsByTagName('li');
                //console.dir(lis);
                lis = [...lis];
                lis.forEach(li => {
                    if(li.className === 'red')
                        if(li.id != 'left' && li.id != 'right')
                            li.className = '';
                });
                while(selectedLis.length != 0)
                {
                    selectedLis.pop();
                }
            }

            var lists = document.getElementById('lists');
            lists = [...lists.children];
            
            //iterate over lists first second third containers
            for(let i = 0; i < lists.length; i++)
            {
                const buttonDiv = document.createElement('div');
                buttonDiv.className = 'button_div';
                const ul = document.createElement('ul');
                ul.addEventListener('click', clickButton);
                const li = document.createElement('li');
                const li2 = document.createElement('li');
                const h2 =  document.createElement('h2');

                li.innerHTML = "<";
                li2.innerHTML = ">";
                li.id = 'left';
                li2.id = 'right';
                li.className = 'grey';
                li2.className = 'grey';

                const listDiv = document.createElement('div');
                listDiv.className = 'list_div';

                const userOl = document.createElement('ol');
                userOl.className = 'ol_list';
                userOl.addEventListener('click', clickSelect);

                if(i === 0)
                    h2.innerHTML = 'FIRST';
                else if(i=== 1)
                    h2.innerHTML = 'SECOND';
                else    
                    h2.innerHTML = 'THIRD';

                lists[i].appendChild(buttonDiv).appendChild(ul).appendChild(li);
                lists[i].appendChild(buttonDiv).appendChild(ul).appendChild(li2);
                lists[i].appendChild(h2);
                lists[i].appendChild(listDiv).appendChild(userOl);
                for(let j = 0; j < 4; j++){
                    const olLI = document.createElement('li');
                    olLI.className = 'ol_class';
                    lists[i].appendChild(listDiv).appendChild(userOl).appendChild(olLI);
                }

            }
            var listDivs = document.getElementsByClassName('list_div');
            listDivs = [...listDivs];
            
            const first = document.querySelector('div#first');
            const second = document.getElementById('second');
            const third = document.getElementById('third');

            var userOllist = document.getElementsByClassName('ol_list');
            userOllist = [...userOllist];
            setUp();