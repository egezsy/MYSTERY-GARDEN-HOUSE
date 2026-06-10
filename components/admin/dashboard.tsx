"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  Trash2,
  Eye,
  LogOut,
  CalendarDays,
  Clock,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface AdminBooking {
  id: string;
  reference: string;
  guestName: string;
  email: string;
  phone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: string | null;
  status: string;
  createdAt: string;
}

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

type StatusFilter = "all" | "pending" | "confirmed" | "cancelled";

export function Dashboard({
  dict,
  bookings,
  messages,
}: {
  dict: Dictionary;
  bookings: AdminBooking[];
  messages: AdminMessage[];
}) {
  const t = dict.admin;
  const router = useRouter();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [busy, setBusy] = useState<string | null>(null);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    messages: messages.length,
  };

  const visible =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  async function updateStatus(id: string, status: string) {
    setBusy(id);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    router.refresh();
  }

  async function deleteBooking(id: string) {
    if (!confirm(t.confirmDelete)) return;
    setBusy(id);
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    setBusy(null);
    router.refresh();
  }

  async function deleteMessage(id: string) {
    if (!confirm(t.confirmDelete)) return;
    setBusy(id);
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setBusy(null);
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-stone">
      {/* Top bar */}
      <header className="bg-primary text-white">
        <div className="container-max flex h-16 items-center justify-between">
          <h1 className="font-serif text-xl font-semibold">
            {t.dashboardTitle}
          </h1>
          <Button
            onClick={logout}
            size="sm"
            className="bg-white/10 hover:bg-white/20"
          >
            <LogOut className="h-4 w-4" />
            {t.logout}
          </Button>
        </div>
      </header>

      <main className="container-max py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            Icon={CalendarDays}
            label={t.statsTotal}
            value={stats.total}
          />
          <StatCard Icon={Clock} label={t.statsPending} value={stats.pending} />
          <StatCard
            Icon={CheckCircle2}
            label={t.statsConfirmed}
            value={stats.confirmed}
          />
          <StatCard
            Icon={MessageSquare}
            label={t.statsMessages}
            value={stats.messages}
          />
        </div>

        <Tabs defaultValue="bookings">
          <TabsList>
            <TabsTrigger value="bookings">{t.bookingsTab}</TabsTrigger>
            <TabsTrigger value="messages">{t.messagesTab}</TabsTrigger>
          </TabsList>

          {/* Bookings */}
          <TabsContent value="bookings">
            <div className="mb-4 flex flex-wrap gap-2">
              {(["all", "pending", "confirmed", "cancelled"] as const).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      filter === s
                        ? "bg-accent text-white"
                        : "bg-white text-charcoal hover:bg-stone"
                    }`}
                  >
                    {s === "all" ? t.filterAll : dict.status[s]}
                  </button>
                ),
              )}
            </div>

            <div className="rounded-lg border border-border bg-white">
              {visible.length === 0 ? (
                <p className="p-8 text-center text-muted-foreground">
                  {t.noBookings}
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.tableRef}</TableHead>
                      <TableHead>{t.tableGuest}</TableHead>
                      <TableHead>{t.tableRoom}</TableHead>
                      <TableHead>{t.tableCheckIn}</TableHead>
                      <TableHead>{t.tableCheckOut}</TableHead>
                      <TableHead>{t.tableStatus}</TableHead>
                      <TableHead className="text-right">
                        {t.tableActions}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-mono text-xs font-semibold">
                          {b.reference}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{b.guestName}</div>
                          <div className="text-xs text-muted-foreground">
                            {b.guests} {dict.rooms.guests}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {b.roomName}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(b.checkIn)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(b.checkOut)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={b.status as never}>
                            {dict.status[b.status as keyof typeof dict.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <BookingDetailDialog dict={dict} booking={b} />
                            {b.status !== "confirmed" && (
                              <IconBtn
                                title={t.confirm}
                                onClick={() => updateStatus(b.id, "confirmed")}
                                disabled={busy === b.id}
                                className="text-green-700 hover:bg-green-100"
                              >
                                <Check className="h-4 w-4" />
                              </IconBtn>
                            )}
                            {b.status !== "cancelled" && (
                              <IconBtn
                                title={t.cancel}
                                onClick={() => updateStatus(b.id, "cancelled")}
                                disabled={busy === b.id}
                                className="text-amber-700 hover:bg-amber-100"
                              >
                                <X className="h-4 w-4" />
                              </IconBtn>
                            )}
                            <IconBtn
                              title={t.delete}
                              onClick={() => deleteBooking(b.id)}
                              disabled={busy === b.id}
                              className="text-destructive hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </IconBtn>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages">
            <div className="rounded-lg border border-border bg-white">
              {messages.length === 0 ? (
                <p className="p-8 text-center text-muted-foreground">
                  {t.noMessages}
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.tableDate}</TableHead>
                      <TableHead>{t.tableGuest}</TableHead>
                      <TableHead>{t.tableContact}</TableHead>
                      <TableHead>{t.tableMessage}</TableHead>
                      <TableHead className="text-right">
                        {t.tableActions}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="whitespace-nowrap text-xs">
                          {formatDate(m.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">{m.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">{m.email}</div>
                          {m.phone && (
                            <div className="text-xs text-muted-foreground">
                              {m.phone}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm">
                          {m.message}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <MessageDetailDialog dict={dict} message={m} />
                            <IconBtn
                              title={t.delete}
                              onClick={() => deleteMessage(m.id)}
                              disabled={busy === m.id}
                              className="text-destructive hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </IconBtn>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({
  Icon,
  label,
  value,
}: {
  Icon: typeof CalendarDays;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-white p-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="font-serif text-2xl font-bold text-primary">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  title,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-9 w-9 items-center justify-center rounded-md text-charcoal transition-colors disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

function BookingDetailDialog({
  dict,
  booking,
}: {
  dict: Dictionary;
  booking: AdminBooking;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconBtn
          title={dict.admin.view}
          onClick={() => {}}
          className="text-accent hover:bg-accent/10"
        >
          <Eye className="h-4 w-4" />
        </IconBtn>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{booking.reference}</DialogTitle>
        </DialogHeader>
        <dl className="divide-y divide-border text-sm">
          <DRow label={dict.confirmation.guest} value={booking.guestName} />
          <DRow label={dict.contact.email} value={booking.email} />
          <DRow label={dict.contact.phone} value={booking.phone} />
          <DRow label={dict.confirmation.room} value={booking.roomName} />
          <DRow
            label={dict.confirmation.checkIn}
            value={formatDate(booking.checkIn)}
          />
          <DRow
            label={dict.confirmation.checkOut}
            value={formatDate(booking.checkOut)}
          />
          <DRow
            label={dict.confirmation.guests}
            value={String(booking.guests)}
          />
          <DRow
            label={dict.bookingForm.specialRequests}
            value={booking.specialRequests || "-"}
          />
        </dl>
      </DialogContent>
    </Dialog>
  );
}

function MessageDetailDialog({
  dict,
  message,
}: {
  dict: Dictionary;
  message: AdminMessage;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconBtn
          title={dict.admin.view}
          onClick={() => {}}
          className="text-accent hover:bg-accent/10"
        >
          <Eye className="h-4 w-4" />
        </IconBtn>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{message.name}</DialogTitle>
        </DialogHeader>
        <dl className="divide-y divide-border text-sm">
          <DRow label={dict.contact.email} value={message.email} />
          <DRow label={dict.contact.phone} value={message.phone || "-"} />
          <DRow label={dict.admin.tableDate} value={formatDate(message.createdAt)} />
        </dl>
        <p className="rounded-md bg-stone/60 p-4 text-base leading-relaxed text-charcoal">
          {message.message}
        </p>
      </DialogContent>
    </Dialog>
  );
}

function DRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-charcoal">{value}</dd>
    </div>
  );
}
