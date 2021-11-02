export const Footer = () => {

    let date = new Date();

    return (<div className="mt-4 text-center">
        Find the repo of this project <a href="https://github.com/NicolasDeHorta/socialBook" target="_blank">here</a> <br />
        Copyright &#169; Nicolas De Horta - {date.getFullYear()} <br />
        <a href="https://www.linkedin.com/in/nicolas-de-horta-b37a48141/" target="_blank">LinkedIn</a>&nbsp;-  
         &nbsp;<a href="https://github.com/NicolasDeHorta" target="_blank">GitHub</a>
    </div>)
}