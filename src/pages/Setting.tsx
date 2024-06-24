import { useEffect, useState } from "react";
import { useMemberStore } from "@/store/memberStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/wrapper";
import { NavLink } from "react-router-dom";
import { Label } from "@/components/ui/label";

export function Setting() {
  const { member, fetchProfile, updateProfile } = useMemberStore();
  const [membername, setMembername] = useState("");
  const [YOB, setYOB] = useState(0);
  
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (member) {
      setMembername(member.membername);
      setYOB(member.YOB);
    }
  }, [member]);

  const handleSave = () => {
    updateProfile({ membername, YOB });
  };

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            <NavLink to="#" className="font-semibold text-primary">General</NavLink>
            <NavLink to="/change-password">Change Password</NavLink>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your account information.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="email" >Email</Label>
                    <Input id="email" value={member.email} disabled readOnly />
                  </div>
                  <div>
                    <Label htmlFor="membername">Member Name</Label>
                    <Input
                      id="membername"
                      value={membername}
                      onChange={(e) => setMembername(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="YOB">Year of Birth</Label>
                    <Input
                      id="YOB"
                      type="number"
                      value={YOB}
                      onChange={(e) => setYOB(Number(e.target.value))}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleSave}>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
