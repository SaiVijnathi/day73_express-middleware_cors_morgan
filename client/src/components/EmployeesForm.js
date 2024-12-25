import React, { useState,useEffect,useRef } from 'react'

function EmployeesForm() {

    let countrySelectRef = useRef();
    let departmentSelectRef = useRef();
    let genderSelectRef = useRef();

    let [employees, setEmployees] = useState([]);
    let [countries, setCountries] = useState([]);
    let [departments, setDepartments] = useState([]);
    let [genders, setGenders] = useState([]);

    useEffect(()=>{
        getCountriesFromServer();
        getDepartmentsFromServer();
        getGendersFromServer();
    },[])


    let getCountriesFromServer = async ()=>{
        let reqOptions ={
            method:"GET"
        }
        let JSONData = await fetch("http://localhost:8888/countriesList",reqOptions);
        let JSOData = await JSONData.json();
        setCountries(JSOData);
        console.log(JSOData);
    }

    let getDepartmentsFromServer = async ()=>{
        let reqOptions ={
            method:"GET"
        }
        let JSONData = await fetch("http://localhost:8888/departmentsList",reqOptions);
        let JSOData = await JSONData.json();
        setDepartments(JSOData);
        console.log(JSOData);
    }

    let getGendersFromServer = async ()=>{
        let reqOptions ={
            method:"GET"
        }
        let JSONData = await fetch("http://localhost:8888/gendersList",reqOptions);
        let JSOData = await JSONData.json();
        setGenders(JSOData);
        console.log(JSOData);
    }

    let getEmployeesFromServer =async()=>{
        let reqOptions ={
            method:"GET"
        };

        let urlQS = `http://localhost:8888/employees?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`;
        console.log(urlQS);

        let urlP= `http://localhost:8888/employees/${countrySelectRef.current.value}/${departmentSelectRef.current.value}/${genderSelectRef.current.value}?limit=5&order=asc`;
        console.log(urlP);

        let JSONData = await fetch(urlP,reqOptions);
        let JSOData = await JSONData.json();
        setEmployees(JSOData);
        console.log(JSOData);
    }

  return (
    <div>
        <form>
            <div>
                <label>Country</label>
                <select ref={countrySelectRef}>
                    {countries.map((ele,i)=>{
                        return <option>{ele}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Department</label>
                <select ref={departmentSelectRef}>
                    {departments.map((ele,i)=>{
                            return <option>{ele}</option>
                        })}
                </select>
            </div>
            <div>
                <label>Gender</label>
                <select ref={genderSelectRef}>
                    {genders.map((ele,i)=>{
                            return <option>{ele}</option>
                        })}
                </select>
            </div>

            <button type='button' onClick={()=>{
                getEmployeesFromServer();
            }}>Get Employees</button>
        </form>
        <br></br>        

        
<div className='tableDiv'>
        <table>
            <thead>
            <tr style={{backgroundColor:"orange",color:"white", fontWeight:"bolder"}}>
                <th>S.NO</th>
                <th>ID</th>
                <th>Profile Picture</th>
                <th>First Name</th>
                <th>last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Department</th>
                <th>Country</th>
            </tr>
            </thead>
            <tbody>
                {employees.map((ele,i)=>{
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{ele.id}</td>
                            <td><img src={ele.profilePicture} alt=''></img></td>
                            <td>{ele.firstName}</td>
                            <td>{ele.lastName}</td>
                            <td>{ele.age}</td>
                            <td>{ele.gender}</td>
                            <td>{ele.email}</td>
                            <td>{ele.department}</td>
                            <td>{ele.country}</td>
                        </tr> 
                    )
                })}
            
            </tbody>
            <tfoot></tfoot>
        </table>
        </div>

    </div>
  )
}

export default EmployeesForm