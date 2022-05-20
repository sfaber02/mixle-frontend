export default function Dropdown (){
    const handleClick = ()=>{

    }
    const userId = localStorage.getItem("user_id")
    if(userId){
        return (
            <div class="dropdown">
                <button onClick={handleClick} className="dropbtn">{userId}</button>
                <div id="myDropdown" class="dropdown-content">
                    <a href="#home">My Mixes</a>
                    <a href="#about">View All Mixes</a>
                    <a href="#contact">Signout</a>
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}