import renderData from "../../utils/renderData";

const mainNav = async (authToken : string, path?: string) => {
    let response = await renderData.render_data('/api/v1/user/check', authToken);
    console.log("🚀 ~ mainNav ~ response:", response)

    return `
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="">
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
                        Enquiry manage
                    </div>

                    <div class="mb-3">
                        <a href="/Add-enquiry" class="text-decoration-none text-dark d-block pb-2">
                            Add Enquiry
                        </a>

                        <a href="/enquiry-list" class="text-decoration-none text-dark d-block pb-2">
                            Enquiry List
                        </a>
                    </div> 

                    <div class="fw-bold pb-2">
                        User manage
                    </div>

                    <div class="">
                        <a href="/add-user" class="text-decoration-none text-dark d-block pb-2">
                            Add Employee
                        </a>

                        <a href="/user-list" class="text-decoration-none text-dark d-block pb-2">
                            Employee List
                        </a>
                    </div> 

                </div>
            </div>
        </div>

      <div class="nav-bar">
        <div class="d-flex align-items-center gap-3">
            <div class="menu-icon">
                <i class="fa-solid fa-bars" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
            </div>
            <div class="logo-text">HIJ</div>
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
}



export default {
  mainNav
};