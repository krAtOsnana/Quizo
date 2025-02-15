import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const GenderCheckbox = ({
	selectedGender,
	onCheckboxChange,
}: {
	selectedGender: string;
	onCheckboxChange: (gender: "male" | "female") => void;
}) => {
	return (
        <div className="flex space-x-4 ">
          <div className="flex items-center space-x-2">
            <Checkbox id="male" checked={selectedGender === "male"} onCheckedChange={() => onCheckboxChange("male")} />
            <Label htmlFor="male" className="text-gray-300">
              Male
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="female"
              checked={selectedGender === "female"}
              onCheckedChange={() => onCheckboxChange("female")}
            />
            <Label htmlFor="female" className="text-gray-300">
              Female
            </Label>
          </div>
        </div>
      )
};
export default GenderCheckbox;