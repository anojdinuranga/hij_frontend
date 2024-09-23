const mainNav = async () => {
    return `
      <div class="nav-bar">
        <div class="d-flex align-items-center gap-3">
            <div class="menu-icon">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="logo-text">HIJ</div>
        </div>
        <div class="d-flex align-items-center">
            <p class="breadcrumb mt-3">
                Client's Detail
            </p>
        </div>
        <div class="d-flex align-items-center gap-4">
            <i class="fa-regular fa-comment menu-icon"></i>
            <i class="fa-regular fa-bell menu-icon"></i>
            <div class="d-flex flex-column">
                <span class="user-name">Samiksha Singh</span>
                <span class="user-team">Team: <span>Bruno Mars</span></span>
            </div>
            <i class="fa-regular fa-circle-user menu-icon-user"></i>
        </div>
    </div>
    `;
}



export default {
  mainNav
};