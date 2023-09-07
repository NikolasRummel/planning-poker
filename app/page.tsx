import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { title, subtitle, titleWrapper } from "@/components/primitives";

export default function Home() {
    return (
        <section className="flex flex-col justify-center mt-32">
            <div className="items-center">
                <div className={titleWrapper()}>
                    <h1 className={title({ size: "lg" })}>Effort Estimation</h1>
                    <div className="flex items-center">
                        <h1 className={title({ size: "lg" })}>is now&nbsp;</h1>
                        <h1 className={title({ color: "blue", size: "lg" })}>easy.</h1>
                    </div>
                </div>
                <p className={subtitle()}>
                    Set up your planning poker session in seconds with our online app
                    designed for collaborative and playful estimation, making the process
                    enjoyable and efficient.
                </p>
            </div>

            <div className="flex space-x-20 mt-32">
                <Button color={"primary"} size="lg" className="">
                    Create New Room
                </Button>

                <div className="flex space-x-4">
                    <Input size="sm" label="room pin" />
                    <Button color={"primary"} size="lg">Join</Button>
                </div>
            </div>

        </section>
    );
}
