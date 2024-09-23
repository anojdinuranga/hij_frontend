const mainFooter = async (data: any = {}) => {
  if (data.role === 1) {
    return default_footer();
  } else {
    return default_footer();
  }
};

const default_footer = () => {
  return `

    `;
};

export default mainFooter;
