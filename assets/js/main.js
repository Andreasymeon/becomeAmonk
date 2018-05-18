// INIT!
//attends que html soit charger 
window.addEventListener('load', init);

function init()	{
	adaptBgSize();
	InitPagination();
	initArrow();
}

function InitPagination()	{
	let paginationDivs = document.querySelectorAll('.pagination');
	for (let i = 0, paginationLength = paginationDivs.length; i < paginationLength; i++)	{
		paginationDivs[i].addEventListener('click', function(event)	{
  			event.preventDefault();
  			changePage(i);
		});
	}
}

function initArrow()	{
	let nextDiv = document.querySelector('.next');
	let previousDiv = document.querySelector('.previous');
	nextDiv.addEventListener('click', callNextPage);
	previousDiv.addEventListener('click', callPreviousPage);
}

// ADAPT BACKGROUND SIZE!
window.addEventListener('resize', adaptBgSize);

//responsive, adapt taille img a largeur ecran point imae soit tj au bon endroit
function adaptSizesToScreen(size)	{
	// largeur du navigateur.
	let windowWidth = window.innerWidth;
	// portion de l'image que l'on veut afficher.
	let bgPortionWidth = 1990;
	// modifier la largeur en fonction des deux valeurs précédentes.
	let newSize = Math.round(size * (windowWidth / bgPortionWidth));
	return newSize;
}

function adaptBgSize()	{
	let newBgWidth = adaptSizesToScreen(12226);
	let backgroundDiv = document.querySelector(".background");
	backgroundDiv.style.width = newBgWidth + "px";
}

// NAVIGATION!
function changePage(indexPage, indexPreviousPage = false)	{
	// Les distances de déplacement du background.
	let bgScrollInfos = [0, 1360, 2314, 3750, 5172, 6610, 8095, 10170, 10170, 11670];
	let newBgScrollWidth = adaptSizesToScreen(bgScrollInfos[indexPage]);
	let backgroundDiv = document.querySelector(".background");
	// Déplacer le background.
	backgroundDiv.style["transform"] = "translate(-" + newBgScrollWidth + "px,0)";
	// Mettre le menu de navigation à jour.
	let paginationDivs = document.querySelectorAll('.pagination');
	let indexPrev = indexPreviousPage;
	for (let i = 0, paginationLength = paginationDivs.length; i < paginationLength; i++)	{
		if (paginationDivs[i].classList.contains('active'))	{
			indexPrev = i;
			paginationDivs[i].classList.remove('active');
			break;
		}
	}
	paginationDivs[indexPage].classList.add('active');
	showText(indexPage, indexPrev);
}

//PREVIOUS ARROW
function callPreviousPage()	{
	let paginationDivs = document.querySelectorAll('.pagination');
	for (let i = 0, paginationLength = paginationDivs.length; i < paginationLength; i++)	{
		// verifier quel ele de array Détecter la page active.
		if (paginationDivs[i].classList.contains('active'))	{
			// si la dernière page n'est pas l'actuelle => page suivante.
			if (i > 0)	{
				let indexPage = i - 1;
				changePage(indexPage, i);
				return;
			}
		}
	}	
}
//NEXT ARROW
function callNextPage()	{
	let paginationDivs = document.querySelectorAll('.pagination');
	for (let i = 0, paginationLength = paginationDivs.length; i < paginationLength; i++)	{
		// Détecter la page active.
		if (paginationDivs[i].classList.contains('active'))	{
			// si la dernière page n'est pas l'actuelle => page suivante.
			if (i < paginationLength  - 1)	{
				let indexPage = i + 1;
				changePage(indexPage, i);
				return;
			}
			// sinon => retour à la première page.
			else {
				changePage(0, paginationLength);
			}
		}
	}	
}

//SHOW TEXT
function showText(indexPage, indexPreviousPage) {
	
	//variable qui contient array des noms des balises pour savoir quel section est selectionné par l'arrow
	let adviceIds = ['homepage', 'panel1', 'panel2','panel3','panel4','panel5','panel6', 'panel7', 'panel8', 'contact'];

	//current page variable contient la balise selectionné dans array par arrow
	let adviceDiv = document.querySelector('#' + adviceIds[indexPage]);
	//prev page  
	console.log(indexPreviousPage)
	let advicePrevDiv = document.querySelector('#' + adviceIds[indexPreviousPage]);
	if (indexPreviousPage !== 9) {
		advicePrevDiv.classList.remove('fadeIn');
		advicePrevDiv.classList.add('fadeOut');
	}
	if (indexPage != 9)	{
		adviceDiv.classList.add('fadeIn');
		adviceDiv.classList.remove('fadeOut');
	}
}