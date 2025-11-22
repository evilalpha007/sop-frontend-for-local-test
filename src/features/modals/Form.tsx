import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Input from "@/components/elements/inputs/Input";

const Form = () => {
  return (
    <>
      <form
        action=""
        className="flex w-full flex-col items-start justify-center gap-3"
      >
        <div className="w-full">
          <label
            htmlFor="name"
            className="font-light capitalize text-theme-light-golden"
          >
            Full Name
          </label>
          <Input type="text" name="name" id="name" placeholder="Ariyan.." />
        </div>
        <div className="w-full">
          <label
            htmlFor="name"
            className="font-light capitalize text-theme-light-golden"
          >
            Email
          </label>
          <Input type="text" name="name" id="name" placeholder="Ariyan@...." />
        </div>
        <div className="w-full">
          <label
            htmlFor="name"
            className="font-light capitalize text-theme-light-golden"
          >
            Mobile
          </label>
          <Input type="text" name="name" id="name" placeholder="01905059057" />
        </div>
        <div className="w-full">
          <PrimaryButton className="w-full">Submit</PrimaryButton>
        </div>
        <div className="w-full text-center">Robot verification</div>
      </form>
    </>
  );
};

export default Form;
