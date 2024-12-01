import { Link } from "react-router-dom"

export function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
            <div className="container">
                <a className='navbar-brand' href='#'>
                    <img src='/logo.png' alt='...' width='30' className='me-2'/>
                </a>
                <Link className="navbar-brand" to="/">Just Money Things</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                         <li className="nav-item">
                             <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                         </li>
                        <li className="nav-item">
                             <Link className="nav-link text-dark" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                             <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <ul className='navbar-nav'>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admin
                            </a>
                             <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/admin/bill">Bill</Link></li>
                                <li><Link className="dropdown-item" to="/admin/budget">Budget</Link></li>
                                <li><Link className="dropdown-item" to="/admin/category">Category</Link></li>
                                <li><Link className="dropdown-item" to="/admin/financialinstitution">Financial Institution</Link></li>
                                <li><Link className="dropdown-item" to="/admin/goal">Goal</Link></li>
                                <li><Link className="dropdown-item" to="/admin/investment">Investment</Link></li>
                                <li><Link className="dropdown-item" to="/admin/loan">Loan</Link></li>
                                <li><Link className="dropdown-item" to="/admin/taxrecord">Tax Record</Link></li>
                                <li><Link className="dropdown-item" to="/admin/transaction">Transaction</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                            </ul>
                        </li>  
                        </ul>
                    </ul>
                </div>
            </div>
        </nav>
     )
}


export function Footer() {
    return(
        <div className='text-center p-4 border-top'>
            <img src="/logo.png" alt="..." width='30' className='me-2'/>
            Just Money Things
        </div>
    )
}