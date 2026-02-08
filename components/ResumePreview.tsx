"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ResumePreview({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { lang } = useI18n();

    // Use different resume based on language
    const resumeFile = lang === "zh" ? "/resume-zh.pdf" : "/resume-en.pdf";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        {lang === "en" ? "Resume Preview" : "简历预览"}
                    </DialogTitle>
                </DialogHeader>

                {/* PDF Preview with watermark overlay */}
                <div className="relative flex-1 overflow-hidden">
                    <div className="h-[70vh] relative">
                        {/* Watermark overlay */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 gap-8 p-12">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-center text-3xl font-bold text-muted-foreground/10 rotate-[-30deg] select-none whitespace-nowrap"
                                    >
                                        {lang === "en" ? "PREVIEW ONLY" : "仅供预览"}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PDF Embed using embed tag for faster loading */}
                        <embed
                            src={`${resumeFile}#toolbar=0&navpanes=0`}
                            type="application/pdf"
                            className="w-full h-full bg-white"
                        />
                    </div>
                </div>

                {/* Footer note */}
                <div className="px-6 py-3 border-t bg-muted/30">
                    <p className="text-xs text-center text-muted-foreground">
                        {lang === "en"
                            ? "This preview is for viewing purposes only. Please contact me directly for more information."
                            : "此预览仅供查看。如需更多信息，请直接联系我。"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
