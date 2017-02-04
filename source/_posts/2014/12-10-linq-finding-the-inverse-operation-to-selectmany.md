---
title: 'Linq: Finding the inverse operation to SelectMany()'
id: 2111
comment: false
tags:
  - 'C#'
  - coding
  - Linq
date: 2014-12-10 17:09:17
---

I am searching for the inverse operation to the SelectMany() linq method. But at first, we have to understand the SelectMany() method. Consider a simple array containing arrays of numbers and we do SelectMany() on them:
<pre>int[][] arrayOfArrayOfInts =
{
    new[]{1,2,3},
    new[]{20,21,22},
    new[]{99}
};

var numbers = arrayOfArrayOfInts.SelectMany(ints => ints);
foreach (var number in numbers)
{
    Console.Write("{0}, ", number);
}
</pre>
This will output the single list of numbers:
<pre>1, 2, 3, 20, 21, 22, 99,
</pre>
For the inverse operation, we have this single list of numbers and are trying to put them in different lists to build the given groups above again. Obviously we need some kind of way to decide, whether a given number should be added to the current list or should produce a new list. To solve this, we could do the integer division by 10 in a group by on all numbers, like so:
<pre>int[] numbers = {1, 2, 3, 20, 21, 22, 99};

var groupedNumbers = numbers
    .GroupBy(num => num/10)
    .Select(group => group);

foreach (var groupedNumber in groupedNumbers)
{
    Console.Write("Group: ");
    foreach (var num in groupedNumber)
    {
        Console.Write("{0}, ", num);
    }
    Console.WriteLine();
}
</pre>
This outputs exactly what I wanted:
<pre>Group: 1, 2, 3,
Group: 20, 21, 22,
Group: 99,
</pre>
So this article is done? Not quite yet, because I maybe oversimplified my actual task at hand :-)

The way my actual task works is that I only know whether a given number belongs to the list or should start a new list by looking at the previous number. We could express this as the following predicate:
<pre>private bool BelongsToSameGroup(int previousNumber, int currentNumber)
{
    return previousNumber + 1 == currentNumber;
}
</pre>
The signature of the method is important as it needs not only the current item but also the previous item of the list! This is the point where GroupBy() is of no help anymore and where I got stuck for some time.

The Linq method I am searching should have a signature to something like this:
<pre>
IEnumerable<IEnumerable<T>> 
    InverseSelectMany<T>(IEnumerable<T> source, Func<T, T, bool> belongsToSameGroupPredicate)
    {...}
</pre>

Knowing the correct target is 90% of the solution. So having found the signature, I came up with the following solution:
<pre>
static class InverseSelectManyLinqExtension
{
    public static IEnumerable<IEnumerable<T>> InverseSelectMany<T>(this IEnumerable<T> source, Func<T, T, bool> belongsToSameGroupPredicate)
    {
        var internalList = new List<T>();
        T lastItem = default(T);
        bool isFirstRun = true;
        foreach (var item in source)
        {
            if (!isFirstRun && !belongsToSameGroupPredicate(lastItem, item))
            {
                //start new group and return current list
                yield return internalList;
                internalList = new List<T>();
            }

            //add item to current list
            internalList.Add(item);
            lastItem = item;
            isFirstRun = false;
        }

        //return last list
        yield return internalList;
    }
}
</pre>

This will build up an internal list of items as long as they belong together and will yield the list, if they do not belong together anymore.

The usage looks like:
<pre>
int[] numbers = {1, 2, 3, 20, 21, 22, 99};

var groupedNumbers = numbers.InverseSelectMany(BelongsToSameGroup);

foreach (var groupedNumber in groupedNumbers)
{
    Console.Write("Group: ");
    foreach (var num in groupedNumber)
    {
        Console.Write("{0}, ", num);
    }
    Console.WriteLine();
}
</pre>

This does now exactly what I needed :-)