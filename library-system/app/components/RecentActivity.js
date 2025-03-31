"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow, differenceInDays } from "date-fns";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // books data
        const booksResponse = await fetch("/api/books");
        if (!booksResponse.ok) {
          throw new Error("Failed to fetch books data");
        }
        const books = await booksResponse.json();

        // users data
        const usersResponse = await fetch("/api/users");
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users data");
        }
        const users = await usersResponse.json();

        // borrowed books data
        const borrowedResponse = await fetch("/api/borrowed-books/stats");
        if (!borrowedResponse.ok) {
          throw new Error("Failed to fetch borrowed books data");
        }
        const borrowedData = await borrowedResponse.json();
        const borrowedBooks = borrowedData.recentBorrows || [];
        const returnedBooks = borrowedData.recentReturns || [];

        // recent activity items for borrowed books
        const borrowActivities = borrowedBooks.map((item) => {
          const book = books.find((b) => b.id === item.book_id);
          const user = users.find((u) => u.email === item.user_email);
          return {
            id: `borrow-${item.id}`,
            type: "borrow",
            book_title: book?.title || "Unknown Book",
            user_name:
              `${user?.f_name || ""} ${user?.l_name || ""}`.trim() ||
              "Unknown User",
            created_at: item.borrow_date,
            book_id: item.book_id,
            user_email: item.user_email,
          };
        });

        // recent activity items for returned books
        const returnActivities = returnedBooks.map((item) => {
          const book = books.find((b) => b.id === item.book_id);
          const user = users.find((u) => u.email === item.user_email);
          return {
            id: `return-${item.id}`,
            type: "return",
            book_title: book?.title || "Unknown Book",
            user_name:
              `${user?.f_name || ""} ${user?.l_name || ""}`.trim() ||
              "Unknown User",
            created_at:
              item.actual_return || item.return_date || item.borrow_date,
            borrow_date: item.borrow_date,
            actual_return: item.actual_return,
            book_id: item.book_id,
            user_email: item.user_email,
          };
        });

        // all activities combined sorted by date
        const allActivities = [...borrowActivities, ...returnActivities]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 10); // 10 most recent activities

        setActivities(allActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Failed to load recent activities: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    // refresh data every 10 minutes
    const intervalId = setInterval(fetchActivities, 10 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // function to get icon based on activity
  const getActivityIcon = (type) => {
    switch (type) {
      case "borrow":
        return "📚";
      case "return":
        return "📖";
      case "add_book":
        return "📝";
      case "remove_book":
        return "❌";
      case "edit_book":
        return "✏️";
      default:
        return "🔔";
    }
  };

  // function to format each activity message
  const formatActivityMessage = (activity) => {
    switch (activity.type) {
      case "borrow":
        return (
          <>
            <strong>{activity.book_title}</strong> was borrowed by{" "}
            {activity.user_name}
          </>
        );
      case "return":
        return (
          <>
            <strong>{activity.book_title}</strong> was returned by{" "}
            {activity.user_name}
          </>
        );
      case "add_book":
        return (
          <>
            Librarian added a new book: <strong>{activity.book_title}</strong>
          </>
        );
      case "remove_book":
        return (
          <>
            Librarian removed: <strong>{activity.book_title}</strong>
          </>
        );
      case "edit_book":
        return (
          <>
            Librarian updated: <strong>{activity.book_title}</strong>
          </>
        );
      default:
        return <>{activity.message}</>;
    }
  };

  // function to format borrowed timestamp
  const formatTimestamp = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "Unknown time";
    }
  };

  const formatReturnTimestamp = (activity) => {
    try {
      if (activity.type === "return" && activity.borrow_date) {
        const returnDate = new Date(activity.actual_return);
        const borrowDate = new Date(activity.borrow_date);
        const daysToReturn = differenceInDays(returnDate, borrowDate);

        if (daysToReturn <= 0) {
          return "returned same day";
        } else if (daysToReturn === 1) {
          return "returned after 1 day";
        } else {
          return `returned after ${daysToReturn} days`;
        }
      }
      return "";
    } catch (error) {
      return "Unknown duration";
    }
  };

  if (loading) {
    return (
      <div className="activity-feed loading">Loading recent activity...</div>
    );
  }

  if (error) {
    return <div className="activity-feed error">{error}</div>;
  }

  return (
    <div className="activity-feed">
      <div className="activity-header">
        <h2>📜 Recent Activity</h2>
        <Link href="/activity-history" className="view-all-link">
          View All
        </Link>
      </div>

      <div className="activity-list">
        {activities.length === 0 ? (
          <div className="no-activity">No recent activity to display</div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <div className="activity-message">
                  {formatActivityMessage(activity)}
                </div>
                <div className="activity-time">
                  {activity.type === "return"
                    ? formatReturnTimestamp(activity)
                    : formatTimestamp(activity.created_at)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
