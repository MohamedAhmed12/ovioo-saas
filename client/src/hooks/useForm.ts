export const useForm = (setFormData: any) => ({
    handleOnChange: (e: any, propName: any = "value") => {
        const { name, value, checked } = e.target;

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: propName === "value" ? value : checked,
        }));
    },
});
