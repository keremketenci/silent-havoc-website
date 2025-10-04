// react
import React from "react";

// next
import Image from "next/image"

// components ui
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/ui/card"

interface TeamMemberCardProps {
    title: string;
    titleClass?: string;
    description?: string;
    descriptionClass?: string;
    contentImage: string;
    contentImageClass?: string;
    footerText?: React.ReactNode;
    footerTextClass?: string;
}

export function TeamMemberCard({
    title,
    titleClass,
    description,
    descriptionClass,
    contentImage,
    contentImageClass,
    footerText,
    footerTextClass,
}: TeamMemberCardProps) {
    return (
        <Card className="flex flex-col w-full min-w-[300px] max-w-[300px]">
            <CardContent className="relative aspect-[3/4] w-full">
                <Image
                    src={contentImage}
                    alt="Description"
                    fill
                    className={`${contentImageClass} object-cover rounded-t-xl`}
                />
            </CardContent>
            <CardHeader className="text-center">
                <CardTitle className={titleClass}>{title}</CardTitle>
                {description && (
                    <CardDescription className={descriptionClass}>{description}</CardDescription>
                )}
            </CardHeader>
            {footerText && (
                <CardFooter className={`${footerTextClass} flex flex-col items-center`}>
                    {footerText}
                </CardFooter>
            )}
        </Card>
    );
}