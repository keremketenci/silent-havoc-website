// components ui
import { LoaderGlitch } from "@/components/ui/loader/LoaderGlitch";

interface LoadingProps {
    text: string;
}

export const Loading: React.FC<LoadingProps> = ({ text }) => {
    return (
        <LoaderGlitch text={text} />
    )
}
