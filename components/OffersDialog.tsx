"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, ExternalLink, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

interface OfferDetails {
    school: string;
    logo: string;
    offerImage: string;
    degree: string;
    status: string;
    highlight?: string;
}

export function OffersDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { lang } = useI18n();
    const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

    const offers: Record<'en' | 'zh', OfferDetails[]> = {
        en: [
            {
                school: "Northwestern University",
                logo: "/images/offers/northwestern.png",
                offerImage: "/images/offers/northwestern-offer.png",
                degree: "M.S. in Computer Science",
                status: "Committed",
                highlight: "McCormick School of Engineering"
            },
            {
                school: "Cornell University",
                logo: "/images/offers/cornell.png",
                offerImage: "/images/offers/cornell-offer.png",
                degree: "M.Eng. in Operations Research",
                status: "Offer Received",
                highlight: "Cornell Tech"
            },
            {
                school: "University College London",
                logo: "/images/offers/ucl.png",
                offerImage: "/images/offers/ucl-offer.png",
                degree: "M.Sc. in Scientific and Data Intensive Computing",
                status: "Offer Received"
            }
        ],
        zh: [
            {
                school: "西北大学（美国）",
                logo: "/images/offers/northwestern.png",
                offerImage: "/images/offers/northwestern-offer.png",
                degree: "计算机科学硕士",
                status: "已确认入读",
                highlight: "麦考密克工程学院"
            },
            {
                school: "康奈尔大学",
                logo: "/images/offers/cornell.png",
                offerImage: "/images/offers/cornell-offer.png",
                degree: "运筹学工程硕士",
                status: "已收到Offer",
                highlight: "Cornell Tech"
            },
            {
                school: "伦敦大学学院",
                logo: "/images/offers/ucl.png",
                offerImage: "/images/offers/ucl-offer.png",
                degree: "科学与数据密集型计算理学硕士",
                status: "已收到Offer"
            }
        ]
    };

    const currentOffers = offers[lang];

    // If an offer is selected, show the offer detail view
    if (selectedOffer !== null) {
        const offer = currentOffers[selectedOffer];
        return (
            <Dialog open={open} onOpenChange={(isOpen) => {
                if (!isOpen) setSelectedOffer(null);
                onOpenChange(isOpen);
            }}>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                    <div className="flex items-center gap-4 px-6 py-4 border-b">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOffer(null)}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <img src={offer.logo} alt={offer.school} className="h-8 w-8 object-contain" />
                            <div>
                                <h2 className="text-lg font-bold">{offer.school}</h2>
                                <p className="text-sm text-muted-foreground">{offer.degree}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[75vh]">
                        <div className="rounded-lg overflow-hidden border shadow-sm">
                            <img
                                src={offer.offerImage}
                                alt={`${offer.school} Offer Letter`}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        {lang === "en" ? "Graduate School Offers" : "研究生录取通知"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 mt-6">
                    {currentOffers.map((offer, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedOffer(index)}
                            className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/30 cursor-pointer group"
                        >
                            <div className="flex items-center gap-5">
                                {/* University Logo - using actual school logos */}
                                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow border border-border/30">
                                    <img
                                        src={offer.logo}
                                        alt={offer.school}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Offer Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-bold truncate">{offer.school}</h3>
                                            {offer.highlight && (
                                                <p className="text-sm text-muted-foreground">{offer.highlight}</p>
                                            )}
                                        </div>
                                        {index === 0 && (
                                            <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 flex-shrink-0">
                                                <Award className="h-3 w-3 mr-1" />
                                                {offer.status}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <GraduationCap className="h-3.5 w-3.5" />
                                            {offer.degree}
                                        </span>
                                    </div>
                                </div>

                                {/* Click indicator */}
                                <div className="flex-shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors">
                                    <ExternalLink className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        {lang === "en"
                            ? "Click on any offer to view the admission letter"
                            : "点击任意录取通知查看详情"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
