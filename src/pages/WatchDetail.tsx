import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/authStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CornerDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import StarRatingInput from "@/components/star-rating-input";
import StarRating from "@/components/star-rating";

interface Watch {
  _id: string;
  watchName: string;
  image: string;
  price: number;
  automatic: boolean;
  watchDescription: string;
  brand: {
    _id: string;
    brandName: string;
  } | null;
  comments: Comment[];
}

interface Comment {
  _id: string;
  rating: number;
  content: string;
  author: {
    _id: string;
    membername: string;
  };
  createdAt: string;
}

const WatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { watches, setWatches, addComment, updateComment, deleteComment } =
    useStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [watch, setWatch] = useState<Watch | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [rating, setRating] = useState<number>(3);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const [editingRating, setEditingRating] = useState<number>(3);

  useEffect(() => {
    if (watches.length === 0) {
      setWatches();
    } else {
      const foundWatch = watches.find((w) => w._id === id);
      setWatch(foundWatch || null);
    }
  }, [id, watches, setWatches]);

  const handleAddComment = () => {
    if (watch && user) {
      addComment(watch._id, rating, newComment, {
        _id: user._id,
        membername: user.membername,
      });
      setNewComment("");
      setRating(3);
    }
  };

  const handleUpdateComment = () => {
    if (watch && editingComment) {
      updateComment(
        watch._id,
        editingComment._id,
        editingContent,
        editingRating
      );
      setEditingComment(null);
      setEditingContent("");
      setEditingRating(3);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (watch) {
      deleteComment(watch._id, commentId);
    }
  };

  const hasUserCommented = watch?.comments.some(
    (comment) => comment.author?._id === user?._id
  );

  if (!watch) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <Wrapper className="mx-auto max-w-7xl">
      <Breadcrumb className="mb-4">
        <BreadcrumbList className="flex space-x-2 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink>
              <NavLink to="/">Home</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-gray-500">/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {watch.watchName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Watch Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="lg:w-1/2 w-full flex flex-col items-center">
              <Card className="w-full shadow-lg">
                <div className="p-4">
                  <img
                    alt={watch.watchName}
                    className="aspect-square w-full rounded-md object-cover"
                    src={watch.image}
                  />
                </div>
              </Card>
            </div>

            <div className="lg:w-1/2 w-full mt-8 lg:mt-0 lg:ml-8 space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="border-b p-4">
                  <div className="flex justify-between">
                    <CardTitle className="text-xl font-semibold">
                      {watch.watchName}
                    </CardTitle>
                    <CardTitle className="text-xl font-semibold">
                      ${watch.price}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-2 text-gray-400">
                    {watch.brand?.brandName}
                  </CardDescription>
                  <CardDescription className="mt-1 text-gray-500">
                    {watch.watchDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="automatic">Automatic</Label>
                    {watch.automatic}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="relative flex flex-col rounded-xl dark:bg-gray-900 bg-gray-50 p-4 mt-8">
            <Badge variant="outline" className="absolute left-3 top-3">
              Customer Reviews
            </Badge>

            {watch.comments.map((comment) => (
              <div
                key={comment._id}
                className="border p-4 rounded-lg shadow-md mt-4"
              >
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>
                      {comment.author?.membername[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{comment.author?.membername}</p>
                </div>
                <div className="flex items-center mt-2">
                  <StarRating rating={comment.rating} />
                  <span className="ml-2 text-sm text-gray-600">
                    ({comment.rating})
                  </span>
                </div>
                <p className="mt-2">{comment.content}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                {comment.author?._id === user?._id && !user?.isAdmin && (
                  <div className="mt-2 flex space-x-2">
                    <Button
                      variant="outline"
                      className="hover:bg-gray-100"
                      onClick={() => {
                        setEditingComment(comment);
                        setEditingContent(comment.content);
                        setEditingRating(comment.rating);
                      }}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="hover:bg-gray-100">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your comment.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                {editingComment?._id === comment._id && !user?.isAdmin && (
                  <div className="mt-4 p-4 border rounded-lg dark:bg-black bg-white shadow-sm">
                    <Label htmlFor="rating" className="block mb-2">
                      Rating
                    </Label>
                    <StarRatingInput
                      rating={editingRating}
                      setRating={setEditingRating}
                    />
                    <Textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      placeholder="Update your comment here..."
                      className="mt-2"
                    />
                    <div className="flex space-x-2 mt-2">
                      <Button
                        onClick={handleUpdateComment}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Update Comment
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingComment(null);
                          setEditingContent("");
                          setEditingRating(3);
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {!user ? (
              <div className="p-4 border rounded-lg text-center dark:bg-black bg-white shadow-sm mt-4">
                <p className="mb-2">
                  You must be logged in to leave a comment.
                </p>
                <Button
                  onClick={() => navigate("/auth/login")}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Login
                </Button>
              </div>
            ) : (
              !hasUserCommented &&
              !user?.isAdmin && (
                <div className="relative overflow-hidden rounded-lg border dark:bg-black bg-white shadow-sm mt-4 p-4">
                  <Label htmlFor="rating" className="block mb-2">
                    Rating
                  </Label>
                  <StarRatingInput rating={rating} setRating={setRating} />
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    id="message"
                    placeholder="Type your message here..."
                    className="mt-4 mb-2"
                  />
                  <div className="flex items-center">
                    <Button
                      onClick={handleAddComment}
                      type="submit"
                      size="sm"
                      className="ml-auto bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Send Review
                      <CornerDownLeft className="size-3.5 ml-2" />
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Wrapper>
  );
};

export default WatchDetail;
