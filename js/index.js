var bName = document.getElementById("bNameId");
var bUrl = document.getElementById("bUrlId");
var tBody = document.getElementById("tBodyId");
var closeD = document.getElementById("closeDialog");

var bookMarks = [];
var usedIndex;

if(localStorage.getItem("bmarks") == null)
{
    bookMarks = [];
}
else
{
    bookMarks = JSON.parse(localStorage.getItem("bmarks"));
    document.querySelector("table").classList.remove ("d-none");
    displayBMarks();
}

function addbMark()
{
    var regEx = /(https?:\/\/www.[a-z0-9]{2,}.com)$/;
    var regExName = /[a-z0-9]{3,}$/;
    if(regEx.test(bUrl.value) && regExName.test(bName.value))
    {
        var oneBookMark = {
            bookMarkName : bName.value,
            bookMarkUrl : bUrl.value
        }
        bookMarks.push(oneBookMark);
        clearInputs();
        displayBMarks();
        localStorage.setItem("bmarks", JSON.stringify(bookMarks));
        document.querySelector("table").classList.remove ("d-none");
    }
    else{
        openDialog();
    }
}

function clearInputs()
{
    bName.value = "";
    bUrl.value = "";
}

function displayBMarks()
{
    var bookMarksTr = "";
    for(i = 0; i < bookMarks.length; i++)
    {
        bookMarksTr +=
        `
        <tr>
            <td>${i}</td>
            <td>${bookMarks[i].bookMarkName}</td>
            <td><button class="vBtn"><a href="${bookMarks[i].bookMarkUrl}" target="_blank" class="text-decoration-none text-white">Visit</a></button></td>                        
            <td><button onclick="getToUpdate(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="delBookMark(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    }
    tBody.innerHTML = bookMarksTr;
}

function delBookMark(i)
{
    bookMarks.splice(i , 1);
    displayBMarks();
    localStorage.setItem("bmarks", JSON.stringify(bookMarks));
}

function getToUpdate(i)
{
    bName.value = bookMarks[i].bookMarkName;
    bUrl.value = bookMarks[i].bookMarkUrl;
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "block";
    usedIndex = i;
}

function updatebMark()
{
    var oneBookMark = {
        bookMarkName : bName.value,
        bookMarkUrl : bUrl.value
    }
    bookMarks[usedIndex] = oneBookMark;
    displayBMarks();
    localStorage.setItem("bmarks", JSON.stringify(bookMarks));
    clearInputs();
    document.getElementById("submitBtn").style.display = "block";
    document.getElementById("updateBtn").style.display = "none";
}

function openDialog()
{
    document.querySelector("dialog").showModal();
}

closeD.addEventListener("click", function()
{
    document.querySelector("dialog").close();
})