export const getInitialsFromEmail = (email: string = "user@gmail.com") => {
    const name = email.split("@")[0];
    const initials = name[0].charAt(0) + name[1]?.charAt(0);
    return initials.toLocaleUpperCase();
   
}