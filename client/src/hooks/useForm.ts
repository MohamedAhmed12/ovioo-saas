export const useForm = (setFormData: any) => ({
    handleOnChange: (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    },
});
