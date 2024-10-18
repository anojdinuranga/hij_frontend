import renderData from "../../utils/renderData";

const mainNav = async (authToken: string, path?: string) => {
  let response = await renderData.render_data("/api/v1/user/check", authToken);

  let sidebar = "";

  if (response.data.role == 1) {
    sidebar = `

     <div class="mb-3">
            <a href="/dashboard" class="text-decoration-none text-dark d-block pb-2">
                Dashboard
            </a>
        </div> 

        <div class="fw-bold pb-2">
            Client manage
        </div>
        <div class="mb-3">
            <a href="/add-client" class="text-decoration-none text-dark d-block pb-2">
                Add Client
            </a>
            <a href="/client-list" class="text-decoration-none text-dark d-block pb-2">
                Client List
            </a>
        </div> 

        <div class="fw-bold pb-2">
            Sample Enquiry Manage
        </div>

        <div class="mb-3">
            <a href="/submitted-sample-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Submitted Sample Enquiry List
            </a>

            <a href="/approved-sample-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Approved Sample Enquiry List
            </a>
        </div>

        <div class="fw-bold pb-2">
            Costing Enquiry Manage
        </div>

        <div class="mb-3">
            <a href="/submitted-costing-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Submitted Costing Enquiry List
            </a>
            
            <a href="/approved-costing-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Approved Costing Enquiry List
            </a>
        </div>
        
        <div class="fw-bold pb-2">
            User manage
        </div>

        <div class="mb-3">
            <a href="/add-user" class="text-decoration-none text-dark d-block pb-2">
                Add Employee
            </a>

            <a href="/user-list" class="text-decoration-none text-dark d-block pb-2">
                Employee List
            </a>
            
            <a href="/user-request-list" class="text-decoration-none text-dark d-block pb-2">
                Employee Request List
            </a>
        </div> 

        <div class="fw-bold pb-2">
            Department manage
        </div>

        <div class="">
            <a href="/add-department" class="text-decoration-none text-dark d-block pb-2">
                Add Department
            </a>

            <a href="/department-list" class="text-decoration-none text-dark d-block pb-2">
                Department List
            </a>
        </div> 
    `;
  } else {
    sidebar = `
        <div class="fw-bold pb-2">
            Client manage
        </div>
        <div class="mb-3">
            <a href="/add-client" class="text-decoration-none text-dark d-block pb-2">
                Add Client
            </a>
            <a href="/client-list" class="text-decoration-none text-dark d-block pb-2">
                Client List
            </a>
        </div> 

        <div class="fw-bold pb-2">
            Sample Enquiry Manage
        </div>

        <div class="mb-3">
            <a href="/submitted-sample-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Submitted Sample Enquiry List
            </a>

            <a href="/approved-sample-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Approved Sample Enquiry List
            </a>
        </div>

        <div class="fw-bold pb-2">
            Costing Enquiry Manage
        </div>

        <div class="mb-3">
            <a href="/submitted-costing-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Submitted Costing Enquiry List
            </a>
            
            <a href="/approved-costing-enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                Approved Costing Enquiry List
            </a>
        </div>
    `;
  }

  return `
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="">${sidebar}</div>
            </div>
        </div>

      <div class="nav-bar">
        <div class="d-flex align-items-center gap-3">
            <div class="menu-icon">
                <i class="fa-solid fa-bars" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
            </div>
            <a href="/dashboard" class="logo-text">HIJ</a>
        </div>
        <div class="d-flex align-items-center">
            <p class="breadcrumb mt-3">
                ${path}
            </p>
        </div>
        <div class="d-flex align-items-center gap-4">
            <i class="fa-regular fa-comment menu-icon"></i>
            <i class="fa-regular fa-bell menu-icon"></i>
            <div class="d-flex flex-column">
                <span class="user-name">${response.data.name}</span>
                <span class="user-team">${response.data.email}</span></span>
            </div>
            <i class="fa-regular fa-circle-user menu-icon-user"></i>
        </div>
    </div>
    `;
};

export default {
  mainNav,
};
