import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";


type Props = {
    name: string;
    value: string;
    icon: IconDefinition;
    onClick: () => void;
    label: ReactNode;
    defaultChecked?: boolean;
}

export default function LabelRadioButton({ name, value, icon, onClick, label, defaultChecked = false }: Props) {
    return (
        <label
            className="radio-btn group">
            <input
                onClick={() => onClick()}
                className="hidden"
                type="radio"
                name={name}
                value={value}
                defaultChecked={defaultChecked}
            />
            <span className="icon">
                <FontAwesomeIcon icon={icon} />
            </span>
            {label}
        </label>
    );
}