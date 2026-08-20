import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid'

const SkeletonComponent = () => {
    return (

        <>
            <Skeleton variant="rectangular" width="100%" height={118} />
            <Skeleton variant="rectangular" width="100%" height={10} className='mt-10' />
            <Skeleton variant="rectangular" width="50%" height={10} className='mt-10' />
            <Skeleton variant="rectangular" width="100%" height={10} className='mt-10' />
            <Skeleton variant="rectangular" width="100%" height={10} className='mt-10' />
            <div className='flex-2'>
                <Skeleton variant="rectangular" width="30%" height={30} className='mt-10' />
                <Skeleton variant="rectangular" width="30%" height={30} className='mt-10' />
            </div>
        </>
    )
}

const CardSkeleton = () => {
    return (
        <>
            <div>
                <Grid container spacing={2} className="mt-50" sx={{ justifyContent: "center" }}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                        <SkeletonComponent />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                        <SkeletonComponent />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                        <SkeletonComponent />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                        <SkeletonComponent />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
export default CardSkeleton