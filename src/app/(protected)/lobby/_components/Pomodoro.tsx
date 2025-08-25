'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTimer } from "@/hooks/use-timer";


export function Pomodoro() {
    const { seconds, status, start, pause, reset } = useTimer({
        initialSeconds: 1500, // 25 minutos
        onFinish: () => alert("Pomodoro finalizado!"),
    });

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return (
        <div className="flex flex-col gap-y-4 lg:w-1/2 lg:mx-auto">
            <Card className="!gap-y-2">
                <CardHeader>
                    <CardTitle className="!text-lg mx-auto">
                        Pomodoro
                    </CardTitle>
                </CardHeader>
                <CardContent className="mx-auto">
                    <p>Status: {status}</p>
                    <h2 className="text-5xl font-semibold">{minutes}:{secs.toString().padStart(2, "0")}</h2>
                    <button onClick={start}>Start</button>
                    <button onClick={pause}>Pause</button>
                    <button onClick={reset}>Reset</button>
                </CardContent>
            </Card>
        </div>
    )
}