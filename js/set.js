function validation() {
    var fname = document.forms["site"]["Fname"];
    var lname = document.forms["site"]["Lname"];
    var Address = document.forms["site"]["Address"];
    var mno = document.forms["site"]["Mno"];
    var email = document.forms["site"]["Email"];
    var Passw = document.forms["site"]["pass"];
    var Comm = document.forms["site"]["Comments"];

    if (fname.value == "") {
        window.alert("Please enter your Firstname");
        validfname=/^[A-Za-z]+$/;
        fname.focus();
        return false;
    }
    if (lname.value == "") {
        window.alert("Please enter your Lastname");S
        lname.focus();
        return false;
    }
    if (Address.value == "") {
        window.alert("Please enter your Address");
        Address.focus();
        return false;
    }
    if (mno.value == "") {
        window.alert("Please enter your Mobilen No.");
        Mno.focus();
        return false;
    }
    if (email.value == "") {
        window.alert("Please enter your Email");
        Email.focus();
        return false;
    }

    if (Passw.value == "") {
        window.alert("Please enter your pass");
        pass.focus();
        return false;
    }
    if (Comm.value == "") {
        window.alert("Please enter your Comments");
        Comments.focus();
        return false;s
    }

    return true;
}

